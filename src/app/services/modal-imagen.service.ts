import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public user : Usuario;

  private _mostrarModal: boolean = false;
  public subioImagen : EventEmitter<string> = new EventEmitter<string>()
  constructor() {}

  get mostrarModal() {
    return this._mostrarModal;
  }
  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales', user: Usuario) {
    this._mostrarModal = true;
    this.tipo = tipo;
    this.user = user;
  }
  cerrarModal() {
    this._mostrarModal = false;
  }
}
