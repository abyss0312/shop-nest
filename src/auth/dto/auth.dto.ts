import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsString } from "class-validator";


export class loginDto {

    @IsString()
    @IsNotEmpty()
    @AutoMap()
    username: string;

    @IsString()
    @IsNotEmpty()
    @AutoMap()
    password: string;

}