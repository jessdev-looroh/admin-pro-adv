import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formLogin = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [localStorage.getItem('remember') === 'true' ? true : false],
  });
  public auth2: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.userService.login(this.formLogin.value).subscribe(
      (data) => {
        if (this.formLogin.get('remember').value) {
          localStorage.setItem('email', this.formLogin.get('email').value);
          localStorage.setItem('remember', 'true');
        } else {
          localStorage.removeItem('email');
          localStorage.setItem('remember', 'false');
        }
        this.router.navigateByUrl('/');
      },
      (err) => {
        let msgError: [] = err.error.err.message.split('\n');
        let error: string = '<div class="row" style="color:red">';
        msgError.forEach((e, index) => {
          if (index != msgError.length-1) error += `<div class="col-12">${e}</div>`;
        });
        error += '</row>';

        Swal.fire({
          icon: 'error',
          title: 'Upss...!',
          html: error,
        });
      }
    );
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.startApp();
  }

  async startApp() {
    this.auth2 = await this.userService.googleInit();
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        let token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogle(token).subscribe(
          (data) => {
            
            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            });
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Upss...!',
          text: error.error,
        });
      }
    );
  }
}
