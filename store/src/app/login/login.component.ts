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
  id: any;
  usuario = {
    email: '',
    password: ''
  }
  

  constructor(public firebase: FirebaseService, private router: Router, public accesib: AccesibilidadService) {
  }
  Ingresar() {
    console.log(this.usuario);
    const { email, password } = this.usuario;
    this.firebase.login(email, password).then(res => {
      console.log("Ingreso: ", res?.user?.displayName);
      this.id = res?.user?.uid;
    });

    setTimeout(() => {
      console.log("El id es: " + this.id);

      this.firebase.datosAccesibilidad(this.id).subscribe((res: any) => {
        //Aquí guardan en  Local los datos de la accesibilidad con res
        //console.log(res);
        this.accesib.Match(this.id);

      });
      this.router.navigate(['inicio']);
    }, 5000);

  }

  logOut() {
    this.firebase.logout();
    this.accesib.setActivo("0");
    this.router.navigate(['inicio']);
  }
  ngOnInit(): void {
    if(this.accesib.activo==""){
      this.id="0";
      this.accesib.Match(this.id);
    }else{
      this.id=this.accesib.activo;
      this.accesib.Match(this.accesib.activo);
    }
  }
}