import { ReservasI } from "./reservas.interface";

export interface ResponseI {
    ok: boolean;
    reservas: {
      data: ReservasI[];
      total: number;
      page: number;
      limit: number;
    };
    msg: string;
  }