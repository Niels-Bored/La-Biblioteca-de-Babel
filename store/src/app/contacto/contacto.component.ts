import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  botoncito:string="";

  constructor(private servicio:FirebaseService) {
    this.forma = new FormGroup({
      'asunto': new FormControl(this.asunto,Validators.required),
      'nombre': new FormControl(this.nombre,[Validators.required,Validators.minLength(3)] ),
      'apellido': new FormControl(this.apellido,Validators.required),
      'correo': new FormControl(this.correo,[Validators.required,Validators.email]),
      'mensaje': new FormControl(this.mensaje,Validators.required),
      'botoncito': new FormControl(this.botoncito,Validators.required)
      });
   }

  ngOnInit(): void {
  }

  enviarCorreo(){
    this.servicio.enviarCorreo("Asunto: "+this.asunto+"       "+this.nombre+" "+this.apellido+" dice: "+this.mensaje+"Responder al correo: "+this.correo).subscribe((res: any) => {
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


