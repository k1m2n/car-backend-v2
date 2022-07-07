/*eslint-disable */
import { Controller, Get, Post,Body, Param, Put,Query, Delete, UseGuards } from '@nestjs/common';
import {CarService } from './car.service';
import {CarDto} from './car.dto';
import { AuthGuard } from '@nestjs/passport';
import { Car } from './car.entity';
import { User } from 'src/users/users.entity';
import { GetUser } from 'src/users/get-user.decorator';

@Controller('car')
@UseGuards(AuthGuard())
export class CarController {

    constructor(private carService:CarService){}

    @Get()
    async getCars(@GetUser() user:User):Promise<Car[]>{
        console.log(user.id);
        return this.carService.getCars(user);
    }

    @Post()
    public async postCar(@Body() car:CarDto,@GetUser() user:User){
        
        return this.carService.postCar(car,user);

    }

    @Put(':id')
    public async putCar(@Param('id') id:string,@Body() car:CarDto,@GetUser() user:User ){
        
        return this.carService.putCar(id,car,user);


    }


    @Get(':id')
    public async getCarById(@Param('id') id:string,@GetUser() user:User):Promise<Car>{

        return this.carService.getCarById(id,user);

    }

    @Delete(':id')
    public async deleteCarById(@Param('id') id:string,@GetUser() user:User):Promise<Car[]>{
        console.log(id);
        return this.carService.deleteCar(id,user);

    }


    

    // @Get(':id')
    // public async getCarById(@Param('id') id:string){

    //     return this.carService.getCarById(id);

    // }

    // // @Put(':id')
    // // public async putCarById(@Param('id') id:string, @Query() query){
    // //     const propertyName=query.property_name;
    // //     const propertyValue=query.property_value;
    // //     return this.carService.putCarById(id,propertyName,propertyValue);

    // // }
    // @Delete(':id')
    // public async deleteCarById(@Param('id') id:string){
    //     return this.carService.deleteCarById(id);
    // }

    // @Put(':id')
    // public async putCar(@Param('id') id:string,@Body() car:CarDto ){
        
    //     return this.carService.putCar(id,car);

    // }
}
