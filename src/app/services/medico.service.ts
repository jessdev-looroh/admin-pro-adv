import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MedicoResponse, Medico } from '../models/medico_response.model';
import { Observable } from 'rxjs';

const URL_API = `${environment.base_url}/medico`;

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  constructor(private http : HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        token: this.token,
      },
    };
  }

  getMedicos():Observable<Medico[]>{
   return  this.http.get<MedicoResponse>(URL_API).pipe(map(resp=>{
     return resp.medicos;
   }));
  }

  actualizarMedico(medico: Medico) {
    console.log(medico);
    return this.http.put(
      `${URL_API}/${medico._id}`,
      { nombre: medico.nombre,hospital: medico.hospital},
      this.headers
    );
  }
  borrarMedico(medico: Medico) {
    return this.http.delete(`${URL_API}/${medico._id}`, this.headers);
  }
  crearMedico(medico:Medico){
    return this.http.post<MedicoResponse>(URL_API, medico, this.headers).pipe(
      map((resp) => {
        return resp.medicos[0];
      })
    );    
  }

  getMedicoID(id:String)
  {
    return  this.http.get<MedicoResponse>(`${URL_API}/${id}`,this.headers).pipe(map(resp=>{
      return resp.medicos;
    }));
  }
}
