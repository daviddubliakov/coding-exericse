import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { BuildOptions, Model } from "sequelize";

interface UserAttributes {
  readonly id: number;
  readonly email: string;
  readonly password: string;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {}

export type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserInstance;
};

export interface IGetCheckUserRequest extends Request {
  user: UserAttributes;
}

export interface IGetCheckUserAuthRequest extends Request {
  user: JwtPayload | string;
}
