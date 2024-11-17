import { DepartamentoI } from "./departamento.interface";
import { UsuarioI } from "./usuario.interface";

export interface ReservasI {
    id: number;
    desde: Date;
    hasta: Date;
    estado: string;
    departamento: DepartamentoI;
    usuario: UsuarioI;
}