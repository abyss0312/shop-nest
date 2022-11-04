import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { UsertypesModule } from './usertypes/usertypes.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:2306,
      username:'root',
      password: 'testshop',
      database: 'shop_db',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    AuthModule, 
    CategoryModule, 
    UsertypesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
