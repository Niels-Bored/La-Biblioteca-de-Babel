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
  fondo: string = "";
  tamano: number = 20;
  color: string = "";
  b_color: string = "white";
  bootstrap: string = "info";
  presentacion = {
    'background-color': this.fondo,
    'color': this.color,
    'font-size.px': this.tamano,
  };
  icono: string = "../../assets/Accesibilidad/icono_normal.png";
  img0: string = "../../assets/Login/Fondo3.jpeg";
  img1: string = "";
  img2: string = "";

  constructor(public firebase: FirebaseService, private router: Router, private accesibilidad: AccesibilidadService) {
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


  cambiarFondo(e: any) {
    switch (e.target.value) {
      case "Escala de Grises":
        this.presentacion['color'] = "black";
        this.img0 = "../../assets/Accesibilidad/fondo_gris_0.png";
        this.b_color = "white";
        this.bootstrap = "secondary";
        this.icono= "../../assets/Accesibilidad/icono_gris.png";
        break;
      case "Normal":
        this.img0 = "../../assets/Login/Fondo3.jpeg";
        this.presentacion['color'] = "black";
        this.b_color = "white";
        this.bootstrap = "info";
        this.icono="../../assets/Accesibilidad/icono_normal.png"
        break;
      case "Alto Contraste":
        this.img0 = "../../assets/Accesibilidad/fondo_alto_0.png";
        this.presentacion['color'] = "blue";
        this.b_color = "info";
        this.bootstrap = "dark";
        this.icono="../../assets/Accesibilidad/icono_normal.png";
        break;
    }

  }
  cambiarTamano(e: any) {
    this.presentacion['font-size.px'] = e.target.value;
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