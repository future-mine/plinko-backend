import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { application, database } from 'src/config';

dotenv.config();
console.log(path.resolve(__dirname, '..', '**/*.entity{.ts,.js}'));
export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  logging: application.env === 'development',
  host: database.host,
  port: database.port,
  username: database.username,
  password: database.password,
  database: database.database,
  entities: [path.resolve(__dirname, '..', '**/*.entity{.ts,.js}')],
  synchronize: application.env === 'development',
  migrationsRun: true,
  keepConnectionAlive: true,
  connectTimeoutMS: 30000,
  dropSchema: process.env.NODE_ENV === 'test',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};
export default typeOrmModuleOptions;
