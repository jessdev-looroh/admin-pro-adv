import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  actualizarFoto(file: File, tipo: 'usuarios'|'medicos'|'hospitales', uid: string) :Observable<string>{
    let data = new FormData();
    let token = localStorage.getItem('token');
    data.append('archivo', file, 'usuario.jpg');
    return this.http.put<string>(`${BASE_URL}/upload/${tipo}/${uid}`, data,{headers:{token}}).pipe(map((resp:any)=>{
      return resp.nombreArchivo;
    }));
  }
}
