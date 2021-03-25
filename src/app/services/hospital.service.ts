import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hospital, HospitalResponse } from '../models/hospital_response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const URL_API = `${environment.base_url}/hospital`;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

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
  getHospitales(): Observable<Hospital[]> {
    return this.http.get(URL_API, this.headers).pipe(
      map((resp: HospitalResponse) => {
        return resp.hospitales;
      })
    );
  }

  crearHospital(nombre: string): Observable<Hospital> {
    return this.http.post<HospitalResponse>(URL_API, {nombre}, this.headers).pipe(
      map((resp) => {
        return resp.hospitales[0];
      })
    );
  }
  actualizarHospital(hospital: Hospital) {
    return this.http.put(
      `${URL_API}/${hospital._id}`,
      { nombre: hospital.nombre },
      this.headers
    );
  }
  borrarHospital(hospital: Hospital) {
    return this.http.delete(`${URL_API}/${hospital._id}`, this.headers);
  }
}
