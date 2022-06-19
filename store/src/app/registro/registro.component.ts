import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatePassword } from '../validate-password';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  mail:string="";
  phone:string="";
  password:string="";
  userName:string="";
  url:string="";
  conf:string="";
  usuarios : any;
  pasa : boolean = false;

  /* formularioContacto : FormGroup | null = null; */
  formularioContacto = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(12)]),
    pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmacion : new FormControl(''),
    nombre : new FormControl('', [Validators.required])
  });

  constructor(public firebase:FirebaseService, private router:Router) { 
    this.consultaDatos();
    this.pasa=true;

    this.formularioContacto.get('confirmacion')?.setValidators(
      [Validators.required,
      ValidatePassword.equalsValidator(this.formularioContacto.get('pass'))]
    );
  }

  checar():boolean{
    if(this.password === this.conf)
      return false;
    else 
      return true;  
  }

  insertarUsuario(){
    
    const mail = this.formularioContacto.get('mail')?.value as string;
    const password = this.formularioContacto.get('pass')?.value as string;
    const phone = this.formularioContacto.get('telefono')?.value as string;
    const userName = this.formularioContacto.get('nombre')?.value as string;

    console.log(mail);
    console.log(password);
    console.log(phone);
    console.log(userName);

    var correo = mail;
    var telefono = phone;
    var con = password;
    var nombre = userName;

    console.log(correo);
    console.log(telefono);
    console.log(con);
    console.log(nombre);

    this.firebase.insertarUsuario(correo, telefono, con, nombre,"https://upload.wikimedia.org/wikipedia/commons/3/32/Star_Wars_-_Darth_Vader.jpg").subscribe((res: any) => {
      console.log(res);
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Usuario regristrado exitosamente!',
      showConfirmButton: false,
      timer: 2000
    });
    this.router.navigate(['inicio']);
  }

  consultaDatos(){
    this.firebase.consultaDatos().subscribe((res: any) => {
      this.usuarios = res;
      console.log(this.usuarios);
    });
  }

  ngOnInit(): void {
  }

}