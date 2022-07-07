import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import {CreateUserDto} from './dtos/create-users.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor(private usersService:UsersService){}
    //this is all part of Stephens course
    // @Post('/signup')
    // createUsers(@Body() body:CreateUserDto){
    //     // console.log(body);
    //     this.usersService.create(body.email,body.password);

    // }

    @Delete('/:id')
    deleteUser(@Param('id') id:number){

        return this.usersService.remove(id);
    }

    @Post('/signup')
    signUp(@Body() createUserDto:CreateUserDto):Promise<void>{

        return this.usersService.signUp(createUserDto);
    }

    @Post('/signin')
    signIn(@Body() createUserDto:CreateUserDto):Promise<{accessToken:string}>{

        return this.usersService.signIn(createUserDto);
    }
}

