/*eslint-disable*/
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import {Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from './users.entity';
// import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-users.dto';
import {getCustomRepository} from "typeorm";
import * as bcrypt from 'bcrypt';
import { identity } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

//we got access to the repository by passing an instance of the repository of type users as a argument in
//constructor
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo:Repository<User>,
    private jwtService:JwtService,){}
    //@InjectRepository(UsersRepository)
    // constructor( @InjectRepository(UsersRepository) private usersRepository:UsersRepository,){}

    //this is all part of Stephens lectures
    // create(email: string, password: string)
    // {
    //     //pass this data to the create function of the repository
    //     //repository function create takes the data that is passed to the service and assigns this data to
    //     //an instance of the user entity
    //     //this instance of the user entity does not persist in the db
    //     //only after save function of the repository this entity instance gets saved into the db
    //     const user=this.repo.create({email,password});
    //     return this.repo.save(user);
    // }

    // // findOne(id:number){

    // //     //so here we are calling the findOne function of the repository api
    // //     return this.repo.findOne(id);
    // // }
    // // find(email:string){
    // //     return User.find({email});

    // // }

    // // async update(id:number,attrs:Partial<User>){
    // //     const user=await this.findOne(id);
    // //     if(!user)
    // //     throw new Error('Not found');

    // //     Object.assign(user,attrs);
    // //     return this.repo.save(user);

    // // }
    // // remove(){

    // // }

    async remove(id:number){
        const result= this.repo.delete(id);
    }


    async signUp(createUserDto:CreateUserDto):Promise<void>{
        // return this.usersRepository.createUser(createUserDto);
        const {email,password}=createUserDto;

        const salt= await bcrypt.genSalt();
        const hashedPassword= await bcrypt.hash(password,salt);
        const user=this.repo.create({email,password:hashedPassword});
        console.log(hashedPassword);
        console.log(createUserDto);

        
        
        try{
         
            await this.repo.save(user);
        }
        catch(err){

            if(err.code==='SQLITE_CONSTRAINT')
            {
                throw new ConflictException('Username already exists')
            }
            else{
                throw new InternalServerErrorException();
            }
            console.log(err);
        }
    }

    async signIn(createUserDto:CreateUserDto):Promise<{accessToken:string}>{
        const{email,password}=createUserDto;
        const user= await this.repo.findOne({ 
            where: { 
              email:email
            } 
          });

          if(user && (await bcrypt.compare(password,user.password)))
          {
            // return "success";
            const payload:JwtPayload={email};
            const accessToken:string=await this.jwtService.sign(payload);
            return {accessToken};
          }
          else{
            throw new UnauthorizedException('Please check your login creds');
          }



    }
}
