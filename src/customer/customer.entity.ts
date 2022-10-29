import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    customerId: number;

    @Column()
    @AutoMap()
    firstname:string;

    @Column()
    @AutoMap()
    lastname:string;
    
    @Column()
    @AutoMap()
    birthdate:string;

    @Column()
    @AutoMap()
    phonenumber:string;

    @Column()
    @AutoMap()
    email:string;

    @Column()
    @AutoMap()
    userId:number;

}