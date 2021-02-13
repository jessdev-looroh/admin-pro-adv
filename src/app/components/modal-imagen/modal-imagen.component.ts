import { Component, ElementRef, OnInit, ViewChild, Input, Renderer2 } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [],
})
export class ModalImagenComponent implements OnInit {
  imagenSeleccionada: File;
  url64ImageSelect: any;
  
  // selectTextValue: string = "";
  // @ViewChild('inputSelectFile') inputSelectFile:ElementRef;

  constructor(public modalService: ModalImagenService,private fu: FileUploadService) {}
  cerrarModal() {
    this.url64ImageSelect = null;
    this.imagenSeleccionada = null;
    this.modalService.cerrarModal();
  }
  ngOnInit(): void {}
  onChangeImage(file: File) {
    this.imagenSeleccionada = file;
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.url64ImageSelect = reader.result;
    };
  }
  actualizarImagen(){
    let id = this.modalService.user.uid;
    let tipo = this.modalService.tipo;
    let file = this.imagenSeleccionada;

    this.fu.actualizarFoto(file, tipo, id).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          text: 'La imagen se actualizó correctamente',
        });
        this.modalService.subioImagen.emit(data);
        this.cerrarModal();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
