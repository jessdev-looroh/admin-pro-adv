import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { UsuarioResponse } from '../models/usuario.response';

const BASE_URL = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  public user$: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(
    null
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  actualizarUsuario(u: Usuario) {
    console.log(this.user$.getValue().uid);
    return this.http.put<UsuarioResponse>(`${BASE_URL}/usuarios/${this.user$.getValue().uid}`, u, {
      headers: { token: this.token },
    }).pipe(map((resp)=>{
      this.user$.next(resp.usuarios[0]);
      return resp;
    }));
  }
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  validarToken(): Observable<boolean> {
    const token = this.token;
    return this.http
      .get<UsuarioResponse>(`${BASE_URL}/login/renew`, {
        headers: {
          token,
        },
      })
      .pipe(
        map((resp) => {
          localStorage.setItem('token', resp.token);
          this.user$.next(resp.usuarios[0]);
          return true;
        }),
        catchError((err) => {
          return of(false);
        })
      );
  }

  googleInit() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '350714592245-dkjmldhevouvufdi2sluelvms7uue19k.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve(this.auth2);
      });
    });
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  crearUsuario(formData: Usuario): Observable<UsuarioResponse> {
    return this.http
      .post<UsuarioResponse>(`${BASE_URL}/usuarios`, formData)
      .pipe(
        tap((resp) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  login(formLogin: Usuario): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${BASE_URL}/login`, formLogin).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
  loginGoogle(token: string): Observable<UsuarioResponse> {
    return this.http
      .post<UsuarioResponse>(`${BASE_URL}/login/google`, { token })
      .pipe(
        tap((resp) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }
}
