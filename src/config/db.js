import { Sequelize } from "sequelize";

const DIALECT = process.env.DB_DIALECT || "sqlite";

export const sequelize = new Sequelize(
  process.env.DB_NAME || "appointments_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    dialect: DIALECT,
    storage: DIALECT === "sqlite" ? (process.env.DB_STORAGE || "./dev.sqlite") : undefined,
    logging: false,
  }
);
