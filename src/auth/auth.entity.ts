import { AutoMap } from "@automapper/classes";
import { UserTypes } from "src/usertypes/user-types.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    @AutoMap()
    username: string;

    @Column()
    @AutoMap()
    password:string;

    @Column()
    @AutoMap()
    isActive: boolean;

    @Column()
    @AutoMap()
    createdDate:string;

    @Column()
    @AutoMap()
    firstname: string;

    @Column()
    @AutoMap()
    lastname: string;

    @Column()
    @AutoMap()
    email:string;

    @Column({default:''})
    @AutoMap()
    phonenumber:string;

    
    @OneToOne(()=> UserTypes)
    @JoinColumn()
    userType: UserTypes

}