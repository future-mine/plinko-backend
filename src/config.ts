import * as dotenv from 'dotenv';
dotenv.config();
export const application = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  prefix: 'api/v1',
};
export const database = {
  host: process.env.RDS_HOSTNAME,
  port: Number(process.env.RDS_PORT),
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
};

export const security = {
  secret: process.env.JWT_SECRET,
  expiresIn: `${process.env.JWT_EXPIRATION_TIME ?? 600}s`,
  salt: process.env.SALT,
};
