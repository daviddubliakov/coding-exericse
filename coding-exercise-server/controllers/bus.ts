import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import VALIDATION_MESSAGES from "../helpers/errorMessages";
import { KEYS } from "../helpers/keys";

import BusModel from "../models/bus";

class BusController {
  static async getAll(_req: Request, res: Response) {
    const buses = await BusModel.findAll({
      where: { isActive: true },
      raw: true,
    });

    return res.json([...buses]);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;

    const bus = await BusModel.findOne({ where: { id } });

    if (!bus) {
      return res.status(StatusCodes.NOT_FOUND).jsonp([
        {
          msg: VALIDATION_MESSAGES.busNotFound,
          param: KEYS.id,
          location: KEYS.body,
        },
      ]);
    }

    console.log();

    return res.json(bus.get({ plain: true }));
  }

  static async create(req: Request, res: Response) {
    const errors = validationResult(req);
    const { year, manufacturer, model, isElectric, isActive } = req.body;

    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).jsonp(errors.array());
    }

    const bus = await BusModel.create({
      year,
      manufacturer,
      model,
      isElectric,
      isActive,
    });

    return res.json({ ...bus });
  }
}

export default BusController;
