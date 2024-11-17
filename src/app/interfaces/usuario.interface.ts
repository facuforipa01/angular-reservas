import { ReservasI } from "./reservas.interface";

export interface UsuarioI extends ReservasI {
    id:number;
    nombre: string;
    email: string;
}