import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserTypes {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
}