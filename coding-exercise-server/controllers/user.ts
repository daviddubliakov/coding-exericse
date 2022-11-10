import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

import UserModel from "../models/user";
import VALIDATION_MESSAGES from "../helpers/errorMessages";
import { KEYS } from "../helpers/keys";
import generateJwt from "../helpers/generateJWT";
import { IGetCheckUserRequest } from "../typings/user";
import User from "../models/user";

class UserController {
  static async registration(req: Request, res: Response) {
    const SALT_ROUNDS = 6;
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).jsonp(errors.array());
    }

    const candidate = await UserModel.findOne({ where: { email } });

    if (candidate) {
      return res.status(StatusCodes.CONFLICT).jsonp([
        {
          msg: VALIDATION_MESSAGES.candidateExists,
          param: KEYS.email,
          location: KEYS.body,
        },
      ]);
    }

    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await UserModel.create({ email, password: hashPassword });
    const auth_token = generateJwt(user.id, user.email);

    return res.json({ auth_token });
  }

  static async login(req: Request, res: Response) {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).jsonp(errors.array());
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).jsonp([
        {
          msg: VALIDATION_MESSAGES.userNotExists,
          param: KEYS.email,
          location: KEYS.body,
        },
      ]);
    }

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return res.status(StatusCodes.FORBIDDEN).jsonp([
        {
          msg: VALIDATION_MESSAGES.credsWrong,
          param: KEYS.password,
          location: KEYS.body,
        },
      ]);
    }

    const auth_token = generateJwt(user.id, user.email);

    return res.json({ auth_token });
  }

  static async check(req: IGetCheckUserRequest, res: Response) {
    const auth_token = generateJwt(req.user.id, req.user.email);

    return res.json({ auth_token });
  }
}

export default UserController;
