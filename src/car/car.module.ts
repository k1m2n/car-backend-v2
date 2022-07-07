import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import {Car} from './car.entity'

@Module({
  imports:[TypeOrmModule.forFeature([Car]),UsersModule],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule {}
