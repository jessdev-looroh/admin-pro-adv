import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital_response.model';
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico_response.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  medicoForm: FormGroup;
  hospitales: Hospital[];
  hospitalSeleccionado: Hospital;
  medicoSeleccionado: Medico;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.aRoute.params.subscribe(({ id }) => {
      if (id != 'nuevo')
        this.medicoService
          .getMedicoID(id)
          .pipe(delay(100))
          .subscribe((resp) => {
            console.log(resp);
            if (!resp[0]) {
              return this.router.navigateByUrl(`/dashboard/medicos`);
            }
            this.medicoSeleccionado = resp[0];
            const {
              nombre,
              hospital: { _id },
            } = this.medicoSeleccionado;
            this.medicoForm.setValue({ nombre, hospital: _id });
          });
    });

    this.cargarHospitales();
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });
  }

  cargarHospitales() {
    this.hospitalService.getHospitales().subscribe((hospitalesBD) => {
      this.hospitales = hospitalesBD;
      this.medicoForm.get('hospital').valueChanges.subscribe((idSeleccion) => {
        this.hospitalSeleccionado = this.hospitales.find(
          (val) => val._id === idSeleccion
        );
      });
    });
  }

  guardarMedico() {
    if (this.medicoSeleccionado) {
      console.log(this.medicoForm.value);
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
      };
      this.medicoService.actualizarMedico(data).subscribe((data) => {
        Swal.fire(
          'Actualizado',
          `${this.medicoForm.get('nombre').value} actualizado correctamente`,
          'success'
        );
      });
    } else {
      this.medicoService
        .crearMedico(this.medicoForm.value)
        .subscribe((resp) => {
          Swal.fire(
            'Creado',
            `${this.medicoForm.get('nombre').value} creado correctamente`,
            'success'
          );
          this.router.navigateByUrl(`/dashboard/medico/${resp._id}`);
        });
    }
  }
}
