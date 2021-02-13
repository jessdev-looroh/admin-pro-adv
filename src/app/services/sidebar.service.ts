import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu : any[] = [
    {
      titulo : 'Dashboard!!',
      icono :'mdi mdi-gauge',
      submenu: [
        {titulo:'Main',url:'/'},
        {titulo:'Configuraciones',url:'account-settings'},
        {titulo:'Gráfica',url:'grafica1'},
        {titulo:'ProgressBar',url:'progress'},
        {titulo:'Promesas',url:'promesas'},
        {titulo:'RXJS',url:'rxjs'},
      ]
    },
    {
      titulo : 'Mantenimiento!!',
      icono :'mdi mdi-gauge',
      submenu: [
        {titulo:'Usuarios',url:'usuarios'},
        {titulo:'Hospitales',url:'hospitales'},
        {titulo:'Medicos',url:'medicos'}
      ]
    }
  ];
  constructor() { }
}
