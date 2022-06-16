import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AccesibilidadService } from '../accesibilidad.service';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  nombre:string="";
  apellido:string="";
  mensaje:string="";
  constructor(private servicio:FirebaseService, public accesib:AccesibilidadService) { }

  ngOnInit(): void {
  }

  enviarCorreo(){
    this.servicio.enviarCorreo(this.nombre+" "+this.apellido+" dice: "+this.mensaje).subscribe((res: any) => {
      console.log(res);
    });

    alert("Correo enviado éxitosamente");
  }
 
}
