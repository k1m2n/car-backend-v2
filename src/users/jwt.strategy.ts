import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import {Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from './users.entity';
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(User) private repo:Repository<User>){
        super({secretOrKey:'topSecrets51',
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
    })
    }

    async validate(payload:JwtPayload):Promise<User>{
        const {email}=payload;
        const user = await this.repo.findOne({ 
            where: { 
              email: email 
            } 
          })

          if(!user){
            throw new UnauthorizedException()
          }
          return user;

    }
}