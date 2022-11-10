import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import VALIDATION_MESSAGES from "../helpers/errorMessages";
import { KEYS } from "../helpers/keys";
import { IGetCheckUserAuthRequest } from "../typings/user";

const authMiddleware = (
  req: IGetCheckUserAuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const auth_token = req.headers.authorization.split(" ")[1];

    if (!auth_token) {
      return res.status(StatusCodes.UNAUTHORIZED).jsonp([
        {
          msg: VALIDATION_MESSAGES.loginFirst,
          location: KEYS.body,
        },
      ]);
    }

    const decoded = jwt.verify(auth_token, process.env.JWT_SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).jsonp([
      {
        msg: VALIDATION_MESSAGES.loginFirst,
        location: KEYS.body,
      },
    ]);
  }
};

export default authMiddleware;
