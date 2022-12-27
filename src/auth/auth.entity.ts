import { AutoMap } from "@automapper/classes";
import { UserTypes } from "src/usertypes/user-types.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    Id:number;

    @Column({unique:true})
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

    @Column({default:''})
    @AutoMap()
    email:string;

    @Column({default:''})
    @AutoMap()
    phonenumber:string;

    
    @ManyToOne(type => UserTypes, type => type.id)
    userType: number

}