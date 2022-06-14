import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  letra:string = "";
  fondo:string = "";
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(public firebase:FirebaseService) { 
  } 

  userLogged = this.firebase.getUserLogged();
  
  // cambiarAccesibilidad(uid:any){
  //   //Aqui modificar los datos del local y los mandan
  //   this.firebase.cambiarDatosAccesibilidad(uid,this.letra,this.fondo);
  // }
}
