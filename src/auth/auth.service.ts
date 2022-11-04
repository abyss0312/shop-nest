import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth.entity';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import {  GenericResponse, getErrorMessage } from 'src/shared/models/generic-response.model';
import * as argon from'argon2';
import { mapper } from 'src/shared/profiles/main';
import { loginDto } from './dto/auth.dto';
import { UserTypes } from 'src/usertypes/user-types.entity';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private config: ConfigService,
        private jwt: JwtService
    ){}

   

    async Login(request:loginDto):Promise<GenericResponse<string>>{

        const response = new GenericResponse<string>();

        try{
            const userDB= await this.userRepository.findOneBy({
                username:request.username
            })
            console.log(userDB);

            if(!userDB) {
                response.code=404;
                response.data= '';
                response.error = getErrorMessage(HttpStatus.NOT_FOUND,['Usuario no encontrado']);
                response.validationResult = true;

                return response;
            };

            const pass = await argon.verify(userDB.password,request.password);

            if(!pass) {
                response.code=404;
                response.data= '';
                response.error = getErrorMessage(HttpStatus.NOT_FOUND,['password incorrect']);
                response.validationResult = true;

                return response;
            };

            const token = 'bearer ' + await this.signToken(userDB.Id,userDB.username);


            response.code = 200;
            response.data = token;
            response.validationResult=true;
            response.error = '';
        }
        catch(ex){
            response.code=500;
            response.data='';
            response.validationResult= false;
            response.error = getErrorMessage(HttpStatus.BAD_GATEWAY,[ex.message]);
        
        }

        return response;

    }

    async SignUp(request:SignupDto):Promise<GenericResponse<string>>{

        const response = new GenericResponse<string>();
        const userType = new UserTypes();
        const date = new Date();
        const hash = await argon.hash(request.password);

        try{
         
            let user = mapper.map(request,SignupDto,User);

            user.createdDate = date.toLocaleDateString();
            user.isActive = true;
            user.password = hash;
            user.userType = {id:2,name:'Customer'};

            const userDB = this.userRepository.create(user);
            await this.userRepository.save(userDB);
            console.log(userDB);

            response.code = 201;
            response.data = '';
            response.validationResult=true;
            response.error = '';
        }
        catch(ex){

            response.code=500;
            response.data='';
            response.validationResult= false;
            response.error = {statusCode: 500, message: [ex.message], error:'BadRequest'}
        }  
            

        return response;
    }


    async signToken(id:number, username:string): Promise<string>{

        const payload = {
            sub: id,
            username
        }
        console.log(this.config.get('SECRET_KEY'));

        return this.jwt.signAsync(payload, {
            expiresIn: '110m',
            secret: this.config.get('SECRET_KEY')
        })
    }
}
