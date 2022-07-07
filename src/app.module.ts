import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Car } from './car/car.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'sqlite',
      database:'db.sqlite',
      entities:[User,Car],
      synchronize:true,
  
    }),
    UsersModule,CarModule],
  
})
export class AppModule {}
