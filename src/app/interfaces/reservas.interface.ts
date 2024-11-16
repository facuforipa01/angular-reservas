import { DepartamentoI } from "./departamento.interface";
import { UsuarioI } from "./usuario.interface";

export interface ReservasI {
    id: number;
    fechaEntrada: Date;
    fechaSalida: Date;
    estado: string;
    departamento: DepartamentoI[];
    usuario: UsuarioI[];
}