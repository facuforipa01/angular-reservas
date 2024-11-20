import { ReservasI } from "./reservas.interface";

export interface ResponseI {
    ok: boolean;
    result: {
      data: ReservasI[];
      total: number;
      page: number;
      limit: number;
    };
    msg: string;
  }