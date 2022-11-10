import { check } from "express-validator";

import VALIDATION_MESSAGES from "./errorMessages";
import { KEYS } from "./keys";

export const registerValidationAndLoginValidation = [
  check(KEYS.email, VALIDATION_MESSAGES.email).isEmail(),
  check(KEYS.password, VALIDATION_MESSAGES.password).isLength({ min: 5 }),
];

export const createBusValidation = [
  check(KEYS.year).isNumeric(),
  check(KEYS.manufacturer).isString(),
  check(KEYS.model).isString(),
  check(KEYS.isElectric).isBoolean(),
  check(KEYS.isActive).isBoolean(),
];
