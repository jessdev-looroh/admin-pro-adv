import { Usuario } from './usuario.model';
import { Medico } from './medico_response.model';
import { Hospital } from './hospital_response.model';
// Generated by https://quicktype.io

export interface Busqueda {
    exito:      boolean;
    usuarios:   Usuario[];
    medicos:    Medico[];
    hospitales: Hospital[];
}
