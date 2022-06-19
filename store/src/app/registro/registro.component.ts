import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  formularioContacto = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(12)]),
    pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmacion : new FormControl('', [Validators.required]),
    nombre : new FormControl('', [Validators.required])
  });

  constructor(public firebase:FirebaseService, private router:Router) { 
    this.consultaDatos();
    this.pasa=true;
  }

  insertarUsuario(){
    this.firebase.insertarUsuario(this.mail, this.phone,this.password,this.userName,this.url).subscribe((res: any) => {
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