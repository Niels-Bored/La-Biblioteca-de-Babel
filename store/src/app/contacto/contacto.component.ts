import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  nombre:string="";
  apellido:string="";
  mensaje:string="";
  tamano: number = 20;
  fondo: string = "";
  color: string = "";
  b_color: string = "";
  bootstrap: string = "";
  presentacion = {
    'background-color': this.fondo,
    'color': this.color,
    'font-size.px': this.tamano,
  };
  icono: string = "";
  img0: string = "";
  img1: string = "";
  img2: string = "";
  
  constructor(private servicio:FirebaseService) { }

  ngOnInit(): void {
  }

  enviarCorreo(){
    this.servicio.enviarCorreo(this.nombre+" "+this.apellido+" dice: "+this.mensaje).subscribe((res: any) => {
      console.log(res);
    });

    alert("Correo enviado éxitosamente");
  }
  
  cambiarFondo(e:any) {
    switch(e.target.value){
      case "Escala de Grises":
        this.presentacion['color'] = "black";
        this.img0 = "../../assets/Accesibilidad/fondo_gris_0.png";
        this.b_color = "white";
        this.bootstrap = "secondary";
        break;
      case "Normal":
        this.img0 = "../../assets/Login/Fondo3.jpeg";
        this.presentacion['color'] = "black";
        this.b_color = "white";
        this.bootstrap = "info";
        break;
      case "Alto Contraste":
        this.img0 = "../../assets/Accesibilidad/fondo_alto_0.png";
        this.presentacion['color'] = "blue";
        this.b_color = "info";
        this.bootstrap = "dark";
        break;
    } 

  }
  cambiarTamano(e:any) {
    this.presentacion['font-size.px'] = e.target.value;
  }
}
