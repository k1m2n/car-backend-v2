import { Exclude } from 'class-transformer';
import { UsersController } from 'src/users/users.controller';
import { User } from 'src/users/users.entity';
import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne} from 'typeorm';
@Entity()
export class Car{


    @PrimaryGeneratedColumn()
    ticketId:number;

    @Column()
    id:string;



    // @Column({unique:true})
    // username:string;

    @Column()
    email:string;

    @Column()
    regNo:string;

    @Column()
    userName:string;

    @Column()
    phoneNo:string;

    @Column()
    fromTime:number;

    @Column()
    toTime:number;

    @Column()
    slotNo:number

    @ManyToOne((_type) => User, user => user.cars,{eager:false})
    @Exclude({toPlainOnly:true})
    user:User;

}