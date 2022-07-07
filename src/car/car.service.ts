/*eslint-disable */
import { HttpException, Injectable, NotFoundException, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarDto } from './car.dto';
import { Car } from './car.entity';
import { CARS } from './car.mock';
import {v4 as uuidv4} from 'uuid';
import { User } from 'src/users/users.entity';

@Injectable()
export class CarService {

    // private cars=CARS;
    // public async getCars(){
    //     return this.cars;
    // }
    
    constructor(@InjectRepository(Car) private repo:Repository<Car>){}
   async getCars(user:User):Promise<Car[]>{
    // const{id}=user;
    // console.log(id);
    // const rawData = await this.repo.query(`SELECT CAR.ticketId,CAR.id,CAR.email,CAR.regNo,CAR.userName,CAR.phoneNo,CAR.fromTime,CAR.toTime,CAR.slotNo FROM CAR WHERE CAR.userID=id`);
    const cars = await this.repo
    .createQueryBuilder("car")
    .where("car.userId = :id", { id: user.id })
    .getMany();
    // return rawData;
    return cars;
   }


   async postCar(carDto:CarDto,user:User):Promise<void>{
    // return this.usersRepository.createUser(createUserDto);
    // const {email,password}=createUserDto;
    const {id,email,regNo,userName,phoneNo,fromTime,toTime,slotNo}=carDto;
    // const salt= await bcrypt.genSalt();
    // const hashedPassword= await bcrypt.hash(password,salt);
    
    const car=this.repo.create({id:id,email:email,regNo:regNo,userName:userName,phoneNo:phoneNo,fromTime:fromTime,toTime:toTime,slotNo:slotNo,user});
    await this.repo.save(car);
    // console.log(newId);
    console.log(carDto);

   }

  public async putCar(carId:string,car:CarDto,user:User){
        // const carId=id;
        const {id,email,regNo,userName,phoneNo,fromTime,toTime,slotNo}=car;
        const test=await this.getCarById(carId,user);
         await this.repo.createQueryBuilder()
    .update({
        email,
        regNo,
        userName,
        phoneNo,
        fromTime,
        toTime,
        slotNo
    })
    .where({
        id: carId,
        user
    })
    .execute()

// return result.raw[0];
        
        // return new Promise((resolve)=>{
        // const index = this.cars.findIndex(car => car.id===carId );
        // if(index===-1)
        // {
        //     throw new HttpException('Not Found',404);
        // }
        // const carTicketId=this.cars[index].ticketId;
        // this.cars[index]=car;
        // this.cars[index].ticketId=carTicketId;
        // return resolve(this.cars[index]);
        // });

    }

    public async getCarById(carId:string,user:User):Promise<Car>{
    
        
        const car= await this.repo.findOne({
            where:{ 
             id:carId,
             user
            }
        });
        // return new Promise((resolve)=>{
        //     const car=this.cars.find((car)=>
        //     car.id===carId);
        //     if(!car)
        //     {
        //         throw new HttpException('Not Found',404);
        //     }
        //     return resolve(car);
        // });
        if (!car) {
            throw new NotFoundException(`Ticket with ID "${carId}" not found in getCarById route`);
          }
      
          return car;

    }

    async deleteCar(carId: string,user:User): Promise<Car[]> {
        const car=await this.getCarById(carId,user);
        console.log(car);
        const {ticketId}=car;
        // const result = await this.repo.delete(car.ticketId);
        const result = await this.repo.delete({ticketId,user});
        console.log(result);
        console.log(carId);
        if (result.affected === 0) {
          throw new NotFoundException(`Ticket with ID "${carId}" not found`);
        }
        const carList :Car[]=await this.getCars(user);
        return carList;
      }

    // public async postCar(car){
    //     return this.cars.push({...car,ticketId:this.cars.length+1});
    // }
    // public async putCarById(id:string,propertyName:string,propertyValue:string):Promise<any>{
    //     const carId=id;
    //     return new Promise((resolve)=>{
    //     const index = this.cars.findIndex(car => car.id===carId );
    //     if(index===-1)
    //     {
    //         throw new HttpException('Not Found',404);
    //     }
    //     this.cars[index][propertyName]=propertyValue;
    //     return resolve(this.cars);
    //     });

    // }
    // public async getCarById(id:string):
    // Promise<any>{
    //     const carId=id;
    //     return new Promise((resolve)=>{
    //         const car=this.cars.find((car)=>
    //         car.id===carId);
    //         if(!car)
    //         {
    //             throw new HttpException('Not Found',404);
    //         }
    //         return resolve(car);
    //     });

    // }

    // public async deleteCarById(id:string):
    // Promise<any>{
    //     const carId=id;
    //     return new Promise((resolve)=>{
    //         const index = this.cars.findIndex(car => car.id===carId );
    //     if(index===-1)
    //     {
    //         throw new HttpException('Not Found',404);
    //     }
    //     this.cars.splice(index,1);
    //     return resolve(this.cars);

    //     });
    // }

    
    // public async putCar(id:string,car):Promise<any>{
    //     const carId=id;
        
    //     return new Promise((resolve)=>{
    //     const index = this.cars.findIndex(car => car.id===carId );
    //     if(index===-1)
    //     {
    //         throw new HttpException('Not Found',404);
    //     }
    //     const carTicketId=this.cars[index].ticketId;
    //     this.cars[index]=car;
    //     this.cars[index].ticketId=carTicketId;
    //     return resolve(this.cars[index]);
    //     });

    // }


}

