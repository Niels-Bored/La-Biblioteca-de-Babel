import { Component, OnInit } from '@angular/core';
import { AccesibilidadService } from '../accesibilidad.service';
@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {
  constructor(public accesib: AccesibilidadService){

  }
  
  ngOnInit(): void {
  }
}
