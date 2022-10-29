import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    username: string;

    @Column()
    password:string;

    @Column()
    isActive: boolean;

    @Column()
    createdDate:string;

  

}