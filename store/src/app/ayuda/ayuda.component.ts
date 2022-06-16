import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {
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

  ngOnInit(): void {
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
