import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsString } from "class-validator";


export class SignupDto {

    @IsString()
    @IsNotEmpty()
    @AutoMap()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    @AutoMap()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    @AutoMap()
    birthdate: string;


    @IsString()
    @IsNotEmpty()
    @AutoMap()
    username: string;

    @IsString()
    @IsNotEmpty()
    @AutoMap()
    password: string;



}