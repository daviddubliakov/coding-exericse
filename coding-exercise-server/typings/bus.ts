import { BuildOptions, Model } from "sequelize";

interface BusAttributes {
  readonly id: number;
  readonly year: number;
  readonly manufacturer: string;
  readonly model: string;
  readonly isElectric: boolean;
  readonly isActive: boolean;
}

interface BusInstance extends Model<BusAttributes>, BusAttributes {}

export type BusModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): BusInstance;
};
