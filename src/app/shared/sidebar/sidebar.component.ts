import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  user : Usuario;
  isLoading= true;
  menuItems : any[];
  constructor(public sidebarService : SidebarService,private userService : UsuarioService) { 
    
    userService.user$.subscribe(u=>{
      this.user = u;
      this.isLoading=false;
    });
  }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this.userService.cerrarSesion();
  }
}
