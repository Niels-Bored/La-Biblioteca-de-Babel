import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AccesibilidadService } from '../accesibilidad.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogged = this.firebase.getUserLogged();
  id:any;
  usuario={
    email: '',
    password: ''
  }
  fondo:string="";
  tamano:number=20;

  constructor(public firebase:FirebaseService, private router:Router, private accesibilidad: AccesibilidadService) { 
  }
  Ingresar() {
    console.log(this.usuario);
    const { email, password } = this.usuario;
    this.firebase.login(email,password).then(res =>{
      console.log("Ingreso: ", res?.user?.displayName);
      this.id = res?.user?.uid;
    });

    setTimeout(() => {  
      console.log("El id es: "+this.id);
      
      this.firebase.datosAccesibilidad(this.id).subscribe((res: any) => {
        //Aquí guardan en  Local los datos de la accesibilidad con res
         //console.log(res);
        this.fondo = this.accesibilidad.getFondo(this.id);
        this.tamano = this.accesibilidad.getTamano(this.id);
      });
      this.router.navigate(['inicio']);
    }, 5000);
    
  }

  logOut() {
    this.firebase.logout();
    this.router.navigate(['inicio']);
  }
  ngOnInit(): void {
  }

}
interface Usuario {
  id: string;
  tamano: number;
  fondo: string;
  color: string;
  bootstrap: string;
  b_color: string;
}