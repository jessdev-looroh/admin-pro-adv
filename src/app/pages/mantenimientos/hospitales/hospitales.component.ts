import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Subscription } from 'rxjs';
import { Hospital } from '../../../models/hospital_response.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[];
  hospitalesTemp : Hospital[];

  hospitalSub$: Subscription;
  imgSUb$: Subscription;
  cargando: boolean = true;

  constructor(
    private hospitalService: HospitalService,
    private modalService: ModalImagenService,
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.imgSUb$ = this.modalService.subioImagen.subscribe((data) => {
      this.getHospitales();
    });
    this.getHospitales();
  }

  buscarHospital(query: string) {
    if (query.trim().length > 0) {
      this.busquedaService.buscarPorColeccion('hospitales',query).subscribe(resp=>{
        this.hospitales = resp;
      })
    }
    else{
      this.hospitales = this.hospitalesTemp;
    }
    
  }

  getHospitales() {
    this.cargando = true;
    this.hospitalSub$ = this.hospitalService
      .getHospitales()
      .subscribe((hpts) => {
        this.cargando = false;
        this.hospitales = hpts;
        this.hospitalesTemp = hpts;
      });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe((resp) => {
      Swal.fire('Actualizado', hospital.nombre, 'success');
    });
  }

  eliminarHospital(hospital) {
    this.hospitalService.borrarHospital(hospital).subscribe((resp) => {
      Swal.fire('Eliminado', hospital.nombre, 'success');
      this.getHospitales();
    });
  }

  async abrirSweetAlert() {
    const valor = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });
    if (valor.value.length > 0) {
      this.hospitalService.crearHospital(valor.value).subscribe(
        (resp) => {
          this.hospitales.push(resp);
          this.hospitalesTemp = this.hospitales;
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al crear hospital',
            text: err.error.err.message,
          });
        }
      );
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalService.abrirModal('hospitales', hospital._id, hospital.img);
  }

  ngOnDestroy(): void {
    this.hospitalSub$.unsubscribe();
  }
}
