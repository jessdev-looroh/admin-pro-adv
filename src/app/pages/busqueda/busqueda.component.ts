import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Hospital } from '../../models/hospital_response.model';
import { Medico } from '../../models/medico_response.model';
import { Usuario } from '../../models/usuario.model';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  constructor(private aRoute: ActivatedRoute,private busquedaService: BusquedasService,private router: Router) { }

  public hospitales:Hospital[] =[];
  public medicos: Medico[] =[];
  public usuarios : Usuario[] =[];

  ngOnInit(): void {

    this.aRoute.params.subscribe(({termino})=>{
        this.busquedaService.busquedaGeneral(termino).subscribe(resp=>{
          this.hospitales = resp.hospitales;
          this.medicos = resp.medicos;
          this.usuarios = resp.usuarios;
        })
    })
  }
  medicoDetalle(medico:Medico){
    this.router.navigate(['/dashboard/medico',medico._id]);
  }
}
