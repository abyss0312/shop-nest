import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth.entity';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { GenericResponse } from 'src/shared/models/generic-response.model';
import * as argon from'argon2';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,


        private config: ConfigService,
        private jwt: JwtService
    ){}


    async SignUp(request:SignupDto):Promise<GenericResponse<string>>{

        const response = new GenericResponse<string>();
        const hash = await argon.hash(request.password);

        try{

        }
        catch(ex){
            
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
