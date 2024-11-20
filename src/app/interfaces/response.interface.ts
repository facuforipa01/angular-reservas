import { ReservasI } from "./reservas.interface";

export interface ResponseI<T = any> {
    ok: boolean;
    result:T;
    msg: string;
  }