import jwt from "jsonwebtoken";

const EXPIRES_TIME = "24h";

const generateJwt = (id: number, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

export default generateJwt;
