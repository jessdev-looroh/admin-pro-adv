import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  imagenSeleccionada: File;
  url64ImageSelect:any;
  user: Usuario;
  userSubscripcion$:Subscription;

  public perfilForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UsuarioService,
    private fu: FileUploadService
  ) {
    this.userSubscripcion$ =userService.user$.subscribe((u) => {
      console.log("entro xd");
      this.user = u;
    });
  }
  ngOnDestroy(): void {
    this.userSubscripcion$.unsubscribe();    
  }
  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.user.nombre, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  onChangeImage(file: File) {
    this.imagenSeleccionada = file;
    if(!file){return;}
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
      this.url64ImageSelect = reader.result;
    }
  }

  cambiarImagen() {
    let id = this.user.uid;
    let file = this.imagenSeleccionada;

    this.fu.actualizarFoto(file, 'usuarios', id).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          text: 'La imagen se actualizó correctamente',
        });
        this.user.img = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  actualizarPerfil() {
    this.userService.actualizarUsuario(this.perfilForm.value).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          text: 'Se actualizó el usuario correctamente',
        });
      },
      (err) => {
        let errMsg = err?.error?.err.message || err;
        console.log(err);
        Swal.fire({
          icon: 'error',
          text: errMsg,
        });
      }
    );
  }
}
