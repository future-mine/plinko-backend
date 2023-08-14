import * as dotenv from 'dotenv';
dotenv.config();
export const application = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  prefix: 'api/v1',
};
export const database = {
  host: process.env.POSTGRES_HOSTNAME,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};

export const security = {
  secret: process.env.JWT_SECRET,
  expiresIn: `${process.env.JWT_EXPIRATION_TIME ?? 600}s`,
  salt: parseInt(process.env.SALT || '10'),
};
