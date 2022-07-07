import {IsEmail,IsString, Matches, MaxLength, MinLength} from 'class-validator';

export class CreateUserDto{

    

    // @IsString()
    // @MinLength(4)
    // username:string;

    @IsEmail()
    email:string;

    @IsString()
    @MinLength(6)
    @MaxLength(16)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message:"password is too weak"})
    password:string;

}