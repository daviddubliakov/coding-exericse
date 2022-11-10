import { DataTypes } from "sequelize";

import sequelizeConfig from "../db";

import { UserModelStatic } from "../typings/user";

const User = sequelizeConfig.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
}) as UserModelStatic;

export default User;
