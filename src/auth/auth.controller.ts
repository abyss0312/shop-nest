import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/auth.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('signup')

    async Signup(@Res() response, @Body() dto:SignupDto){

            const result = await this.authService.SignUp(dto);

            switch(result.code){
                case 201:{
                    return response.status(HttpStatus.CREATED).send(result);
                }
                default:{
                    return response.status(HttpStatus.BAD_GATEWAY).send(result);
                }
            }

      
    }

    @Post('login')
    async Login(@Res() response, @Body() dto:loginDto){

        const result = await this.authService.Login(dto);

        switch(result.code){
            case 200:{
                return response.status(HttpStatus.OK).send(result);
            
            }
        
            case 404:{
                return response.status(HttpStatus.NOT_FOUND).send(result);
            }
       
            default:{
                 return response.status(HttpStatus.BAD_GATEWAY).send(result);
            }
          
        }
        
    }
}
