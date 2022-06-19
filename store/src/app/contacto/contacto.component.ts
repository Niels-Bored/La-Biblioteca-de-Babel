import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccesibilidadService } from '../accesibilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  forma!: FormGroup;
  asunto:string="";
  nombre:string="";
  apellido:string="";
  mensaje:string="";
  correo:string="";

  constructor(private servicio:FirebaseService, public accesib:AccesibilidadService) {
    this.forma = new FormGroup({
      'nombre': new FormControl(this.nombre,[Validators.required,Validators.minLength(3)] ),
      'apellido': new FormControl(this.apellido,Validators.required),
      'mensaje': new FormControl(this.mensaje,Validators.required)
      });
   }

  ngOnInit(): void {
  }

  enviarCorreo(){
    const nombre = this.forma.get('nombre')?.value as string;
    const apellido = this.forma.get('apellido')?.value as string;
    const mensaje = this.forma.get('mensaje')?.value as string;
    
    this.servicio.enviarCorreo(nombre+" "+apellido+" dice: "+mensaje).subscribe((res: any) => {
      console.log(res);
    });
    
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Enviado exitosamente!',
      showConfirmButton: false,
      timer: 2000
    });
  }
}


