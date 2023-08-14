import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();
console.log(path.resolve(__dirname, '..', '**/*.entity{.ts,.js}'));
export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  logging: process.env.NODE_ENV === 'development',
  host: process.env.RDS_HOSTNAME,
  port: Number(process.env.RDS_PORT),
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  entities: [path.resolve(__dirname, '..', '**/*.entity{.ts,.js}')],
  synchronize: false,
  migrationsRun: true,
  keepConnectionAlive: true,
  connectTimeoutMS: 3000,
  dropSchema: process.env.NODE_ENV === 'test',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};
export default typeOrmModuleOptions;
