import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { UsuarioResponse } from '../../../models/usuario.response';
import Swal from 'sweetalert2';
import { resourceLimits } from 'worker_threads';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[];
  usuariosTmp: UsuarioResponse;
  isLoading: boolean = true;
  isSearching: boolean = false;
  titulo: string = 'Usuarios';
  total: number = 0;
  uid:string;
  imgSubs$ : Subscription;

  constructor(
    private userService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalService : ModalImagenService
  ) {
    this.obtenerUsuarios(true);
    this.uid = userService.user$.getValue().uid;
    this.imgSubs$=modalService.subioImagen.subscribe(img=>{
      this.obtenerUsuarios(null);
    });
  }
  ngOnInit(): void {}
  onComboChange(user:Usuario,rol:string){
      user.role = rol;
      console.log(user.uid);
      this.userService.actualizarUsuario(user).subscribe((res)=>{
        console.log(res);
      });
  }
  obtenerUsuarios(siguientes: boolean) {
    this.isLoading = true;
    this.userService.getUsuarios(siguientes).subscribe((res) => {
      this.usuarios = res.usuarios;
      this.usuariosTmp = res;
      this.total = res.totalRegistros;
      this.isLoading = false;
    });
  }

  buscarUsuario(query: string) {
    if (query.length > 0) {
      this.titulo = `Buscando  '${query}'`;
      // this.isLoading = true;
      this.isSearching = true;
      this.busquedaService
        .buscarPorColeccion('usuarios', query)
        .subscribe((res: Usuario[]) => {
          // this.isLoading = false;
          this.usuarios = res;
          this.total = res.length;
        });
    } else {
      this.titulo = 'Usuarios';
      this.isSearching = false;
      this.usuarios = this.usuariosTmp.usuarios;
      this.total = this.usuariosTmp.totalRegistros;
    }
  }

  async eliminarUsusario(user:Usuario){
    console.log(user.nombre);
    let resp = await Swal.fire({
      title: `¿Deseas eliminar este usuario?`,
      html: `Si aceptas el usuario <strong> ${user.email} </strong> se eliminará para siempre`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Si, elimínalo!'
    })
    if(resp.isConfirmed){
      this.userService.eliminarUsuario(user.uid).subscribe((r)=>{
        console.log(r);
        Swal.fire(
          'Eliminado!',
          'Se eliminó el usuario.',
          'success'
        )
      });
      this.obtenerUsuarios(null);
    }
    // .then((result) => {
    //   if (result.isConfirmed) {
        
    //   }
    // })
  }
  abrirModal(user:Usuario){
    console.log(user);
    this.modalService.abrirModal('usuarios',user);
  }
  ngOnDestroy(): void {
    this.imgSubs$.unsubscribe();
    
  }
}
