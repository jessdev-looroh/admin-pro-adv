import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/medico.service';
import { Medico } from '../../../models/medico_response.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';
import { Router } from '@angular/router';
import { Hospital } from '../../../models/hospital_response.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit {
  medicosTmp: Medico[];
  medicos: Medico[];
  imgSUb$: Subscription;
  cargando: boolean = true;

  constructor(
    private medicoService: MedicoService,
    private modalService: ModalImagenService,
    private buscarService: BusquedasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.imgSUb$ = this.modalService.subioImagen.subscribe((data) => {
      this.getMedicos();
    });
    this.getMedicos();
  }

  abrirModal(medico: Medico) {
    this.modalService.abrirModal('medicos', medico._id, medico.img);
  }
  buscarMedico(query: string) {
    if (query.length > 0) {
      this.buscarService
        .buscarPorColeccion('medicos', query)
        .subscribe((data) => {
          this.medicos = data;
        });
    } else {
      this.medicos = this.medicosTmp;
    }
  }
  editarMedico() {
    this.router.navigate(['/dashboard', 'medico', 'nuevo']);
  }
  eliminarMedico(medico: Medico) {
    this.medicoService.borrarMedico(medico).subscribe((resp) => {
      const y= this.medicos.indexOf(medico);
      this.medicos.splice(y,1);
    });
  }
  getMedicos() {
    this.cargando = true;
    this.medicoService.getMedicos().subscribe((resp) => {
      this.cargando = false;
      this.medicos = resp;
      this.medicosTmp = resp;
    });
  }
}
