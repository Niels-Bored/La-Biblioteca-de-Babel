import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
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
  usuarios : any;

  constructor(public firebase:FirebaseService, private router:Router) { 
    this.consultaDatos();
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
