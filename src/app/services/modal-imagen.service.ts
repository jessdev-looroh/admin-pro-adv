import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital_response.model';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public uid:string;
  public img:string;

  private _mostrarModal: boolean = false;
  public subioImagen : EventEmitter<string> = new EventEmitter<string>()
  constructor() {}

  get mostrarModal() {
    return this._mostrarModal;
  }
  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales', uid:string, img:string) {
    this._mostrarModal = true;
    this.tipo = tipo;
    this.uid = uid;
    this.img =  img;
  }
  cerrarModal() {
    this._mostrarModal = false;
  }
}
