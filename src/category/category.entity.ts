import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @AutoMap()
    name:string;

    @Column()
    @AutoMap()
    image: string;

    @Column()
    createdDate: string;
}