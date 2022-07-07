import { Car } from 'src/car/car.entity';
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id:number;


    // @Column({unique:true})
    // username:string;

    @Column()
    email:string;

    @Column()
    password:string;


    @OneToMany((_type) => Car, (car) => car.user ,{eager:true})
    cars:Car[];
}