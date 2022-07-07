import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User } from './users.entity';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:'topSecrets51',
      signOptions:{
        expiresIn:3600,
      },
    }),
    TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy],
  exports:[JwtStrategy,PassportModule]
})
export class UsersModule {}
