import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public formSubmited = false;
  public registerForm  = this.fb.group({
    nombre : ['Jess', [Validators.required,Validators.minLength(3)]],
    email : ['jess@jess.com',[Validators.required]],
    password : ['123456',Validators.required],
    password2 : ['123456',Validators.required],
    terminos : [true,Validators.required],
  },{
    validators: this.passwordsIguales('password','password2')
  });

  constructor(private fb: FormBuilder,private userService :UsuarioService,private router:Router) {
    
  }

  ngOnInit(): void {}

  campoNoValido(campo:string):boolean{
    if(this.registerForm.get(campo).invalid && this.formSubmited){
      return true;
    }else{
      return false;

    }
  }

   crearUsuario() {
    this.formSubmited = true;
    if(this.registerForm.valid && this.registerForm.get('terminos').value){
      this.userService.crearUsuario(this.registerForm.value).subscribe(async data=>{
        
        await Swal.fire({
          icon:'success',
          title:'Usuario creado',
          text:'Se creo el usuario '+data.usuarios[0].email,
        });
        console.log("Esperó");;
        this.router.navigateByUrl('/');

      },(err)=>{
        Swal.fire({
          icon:'error',
          title:'Upss...!',
          text:err.error.err.message,

        });
        
      });
    }else{

      console.log("Formulario no es correcto");
    }
  }
  passwordsIguales(p1:string,p2:string){
      return (formGroup:FormGroup)=>{
        const pass1Control = formGroup.get(p1);
        const pass2Control = formGroup.get(p2);
        if(pass1Control.value===pass2Control.value){
          pass2Control.setErrors(null)
        }else{
          pass2Control.setErrors({noEsIgual:true})
        }
      }
  }

  contrasenasNoValid(){
    const pass1 = this.registerForm.get("password").value;
    const pass2 = this.registerForm.get("password2").value;
    if((pass1!==pass2) && this.formSubmited)
    {
      return true;
    }else{
      return false;
    }
  }
}
