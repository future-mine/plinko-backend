import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './typeOrmModule.option';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmModuleOptions,
    }),
  ],
})
export class DatabaseModule {}
