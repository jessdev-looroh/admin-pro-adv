import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { UsuarioResponse } from '../models/usuario.response';

const BASE_URL = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private pagina = 0;
  private limite = 5;
  private totalPaginas = 0;
  private usuariosTmp: UsuarioResponse;

  private rol:string;
  public auth2: any;
  public user$: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  getUsuarios(siguientes: boolean): Observable<UsuarioResponse> {
    let userResp: UsuarioResponse;
    if (siguientes !== null) {
      if (
        this.pagina === this.totalPaginas &&
        this.pagina !== 0 &&
        siguientes
      ) {
        return of(this.usuariosTmp);
      }
      if (siguientes) this.pagina++;
      else if (this.pagina > 1) {
        this.pagina--;
      } else {
        return of(this.usuariosTmp);
      }
    }

    return this.http
      .get<Usuario[]>(
        `${BASE_URL}/usuarios?pagina=${this.pagina}&limite=${this.limite}`,
        { headers: { token: this.token } }
      )
      .pipe(
        map((res: any) => {
          this.totalPaginas = Math.ceil(res.totalRegistros / this.limite);
          this.usuariosTmp = res;
          return res;
        })
      );
  }
  eliminarUsuario(uid: string): Observable<boolean> {
    return this.http
      .delete<{ exito: boolean }>(`${BASE_URL}/usuarios/${uid}`, {
        headers: { token: localStorage.getItem('token') },
      })
      .pipe(
        map((res) => {
          console.log(res);
          return res.exito;
        })
      );
  }
  actualizarUsuario(u: Usuario) {
    let uid= u.uid;
    if(uid==null){
        uid = this.user$.getValue().uid;
    }
    console.log(uid);
    return this.http
      .put<UsuarioResponse>(
        `${BASE_URL}/usuarios/${uid}`,
        u,
        {
          headers: { token: this.token },
        }
      )
      .pipe(
        map((resp) => {
          this.user$.next(resp.usuarios[0]);
          return resp;
        })
      );
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
          this.guardarStorage(resp.token,resp.menu);
          this.rol = resp.usuarios[0].role;
          this.user$.next(resp.usuarios[0]);
          return true;
        }),
        catchError((err) => {
          return of(false);
        })
      );
  }

  guardarStorage(token:string,menu:any){
    localStorage.setItem('menu',JSON.stringify(menu));
    localStorage.setItem('token',token);
  }

  get role(){
    return this.rol;
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
          this.guardarStorage(resp.token,resp.menu);
        })
      );
  }

  login(formLogin: Usuario): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${BASE_URL}/login`, formLogin).pipe(
      tap((resp) => {
        this.guardarStorage(resp.token,resp.menu);
      })
    );
  }
  loginGoogle(token: string): Observable<UsuarioResponse> {
    return this.http
      .post<UsuarioResponse>(`${BASE_URL}/login/google`, { token })
      .pipe(
        tap((resp) => {
          this.guardarStorage(resp.token,resp.menu);
        })
      );
  }
}
