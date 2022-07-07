import {Allow, IsEmail,IsString, Matches, MaxLength, MinLength} from 'class-validator';
export class CarDto{
    @IsString()
     id:string;
    @IsEmail()
     email:string;
     @IsString()
     regNo:string;
     @IsString()
     userName:string;
     @IsString()
     phoneNo:string;

     @Allow()
     fromTime:number;
     

     @Allow()
     toTime:number;
     @Allow()
     slotNo:number;
}