import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const URL_BASE = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) {}

  buscarPorColeccion(coleccion: 'usuarios'|'hospitales' |'medicos', query: string) {
    return this.http.get(
      `${URL_BASE}/busqueda/coleccion/${coleccion}/${query}`,
      this.headers
    ).pipe(map((res:any)=>{
      return res.resultado;
    }));
  }

  get token() {
    return localStorage.getItem('token');
  }

  get headers() {
    return { headers: { token: this.token } };
  }
}
