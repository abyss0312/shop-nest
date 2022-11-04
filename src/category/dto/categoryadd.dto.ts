import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsString } from "class-validator";


export class CategoryAddDto {

    @AutoMap()
    @IsString()
    @IsNotEmpty()
    name: string;

    @AutoMap()
    @IsString()
    @IsNotEmpty()
    image: string;

}