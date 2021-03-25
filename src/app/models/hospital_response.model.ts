import { Usuario } from './usuario.model';
// Generated by https://quicktype.io


//RESPUESTA DEL GET HOSPITALES
export interface HospitalResponse {
  exito: boolean;
  hospitales: Hospital[];
}

//INTERFACE HOSPITAL
export interface Hospital {
  _id?: string;
  nombre?: string;
  usuario?: _hospitalUser;
  img?: string;
}

//USUARIO QUE REGISTRO EL HOSPITAL
interface _hospitalUser {
  _id: string;
  nombre: string;
  img: string;
}