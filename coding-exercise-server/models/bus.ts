import { DataTypes } from "sequelize";

import sequelizeConfig from "../db";

import { BusModelStatic } from "../typings/bus";

const Bus = sequelizeConfig.define("bus", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  year: { type: DataTypes.INTEGER },
  manufacturer: { type: DataTypes.STRING },
  model: { type: DataTypes.STRING },
  isElectric: { type: DataTypes.BOOLEAN },
  isActive: { type: DataTypes.BOOLEAN },
}) as BusModelStatic;

export default Bus;
