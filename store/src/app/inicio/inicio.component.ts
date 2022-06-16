import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  tamano: number = 20;
  fondo: string = "";
  color: string = "";
  b_color: string = "white";
  bootstrap: string = "info";
  presentacion = {
    'background-color': this.fondo,
    'color': this.color,
    'font-size.px': this.tamano,
  };
  icono: string = "";
  img0: string = "";
  img1: string = "";
  img2: string = "";

  ngOnInit(): void {
  }
  cambiarFondo(e:any) {
    switch(e.target.value){
      case "Escala de Grises":
        this.presentacion['background-color'] = "grey";
        this.presentacion['color'] = "black";
        this.b_color ="white";
        this.bootstrap = "secondary";
        break;
      case "Normal":
        this.presentacion['background-color'] = "pink";
        this.presentacion['color'] = "black";
        this.b_color ="white";
        this.bootstrap = "info";
        break;
      case "Alto Contraste":
        this.presentacion['background-color'] = "black";
        this.presentacion['color'] = "blue";
        this.b_color ="info";
        this.bootstrap = "dark";
        break;
    } 

  }
  cambiarTamano(e:any) {
    this.presentacion['font-size.px'] = e.target.value;
  }
}
