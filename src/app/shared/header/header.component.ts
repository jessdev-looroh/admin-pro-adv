import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {

  usuario : Usuario;
  isLoading = false;
  
  constructor(private router: Router,private userService:UsuarioService) {
    userService.user$.subscribe(u=>{
      this.usuario = u;
      this.isLoading= true;
    });
  }
  ngOnInit(): void {}
  cerrarSesion() {
    this.userService.cerrarSesion();
    this.router.navigateByUrl('/login');
  }
}
