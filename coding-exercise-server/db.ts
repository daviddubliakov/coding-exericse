import { Sequelize } from "sequelize";

const DIALECT = "postgres";

const sequelizeConfig = new Sequelize(
  process.env.POSTGRES_DB_NAME,
  process.env.POSTGRES_DB_USER,
  process.env.POSTGRES_DB_PASSWORD,
  {
    dialect: DIALECT,
    host: process.env.POSTGRES_DB_HOST,
    port: Number(process.env.POSTGRES_DB_PORT),
  }
);

export default sequelizeConfig;
