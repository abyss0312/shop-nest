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
import { ErrorsCode } from 'src/shared';
import { getValidationError } from 'src/shared/ge-validation-error';

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
        console.log(getValidationError(ErrorsCode.ERR_NETWORK));

        try{
            const userDB= await this.userRepository.findOneBy({
                username:request.username
            })
            console.log(userDB);

            if(!userDB) {
                response.code=404;
                response.data= '';
                response.error = getErrorMessage(ErrorsCode.ERR_USER_NOT_FOUND);
                response.validationResult = true;

                return response;
            };

            const pass = await argon.verify(userDB.password,request.password);

            if(!pass) {
                response.code=404;
                response.data= '';
                response.error = getErrorMessage(ErrorsCode.ERR_PASS_INCORRECT);
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
            response.error = getErrorMessage(ErrorsCode.ERR_NETWORK);
    
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

            console.log(user)
            user.createdDate = date.toLocaleDateString();
            user.isActive = true;
            user.password = hash;
            user.userType = 1;

            const userDB = this.userRepository.create(user);
            console.log(userDB);
            await this.userRepository.save(userDB);
            

            response.code = 201;
            response.data = '';
            response.validationResult=true;
            response.error = '';
        }
        catch(ex){

            response.code=500;
            response.data='';
            response.validationResult= false;
            switch(ex.code){
                case ErrorsCode.ER_DUP_ENTRY :
                    response.error = getErrorMessage(ex.code) + 'el usuario'
                break;
                default:
                    response.error = getErrorMessage(ErrorsCode.ERR_NETWORK)
            }

            
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
