import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DIALECT = process.env.DB_DIALECT;

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER ,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT,
    dialect: DIALECT,
    logging: false,
  }
);
