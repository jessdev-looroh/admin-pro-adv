import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router,private userService:UsuarioService) {}

  ngOnInit(): void {}
  cerrarSesion() {
    this.userService.cerrarSesion();
    this.router.navigateByUrl('/login');
  }
}
