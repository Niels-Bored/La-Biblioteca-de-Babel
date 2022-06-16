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
  tamano: number = 0;
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
        this.presentacion['background-color'] = "grey";
        this.presentacion['color'] = "black";
        break;
      case "Normal":
        this.presentacion['background-color'] = "pink";
        this.presentacion['color'] = "black";
        break;
      case "Alto Contraste":
        this.presentacion['background-color'] = "black";
        this.presentacion['color'] = "blue";
        break;
    } 

  }
  cambiarTamano(e:any) {
    this.presentacion['font-size.px'] = e.target.value;
  }
}
