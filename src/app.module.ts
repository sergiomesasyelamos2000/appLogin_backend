import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { environment } from '../environment/environment';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      ...environment.typeormConfig,
    } as TypeOrmModuleOptions),
    AuthModule
  ],
})
export class AppModule {}
