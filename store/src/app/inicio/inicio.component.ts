import { Component, OnInit } from '@angular/core';
import { AccesibilidadService } from '../accesibilidad.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  id:string="";
  constructor(public accesib: AccesibilidadService) {
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
