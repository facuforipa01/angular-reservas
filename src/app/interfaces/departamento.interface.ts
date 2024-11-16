import { ReservasI } from "./reservas.interface";

export interface DepartamentoI extends ReservasI {
    id:number;
    nroDepartamento: number;
    descripcion: string;
}