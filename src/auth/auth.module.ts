import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypes } from 'src/usertypes/user-types.entity';
import { AuthController } from './auth.controller';
import { User } from './auth.entity';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([User,UserTypes]),JwtModule.register({})],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
