import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-l',
  templateUrl: './vista-l.component.html',
  styleUrls: ['./vista-l.component.css']
})
export class VistaLComponent implements OnInit {
  
  libros : any[] = [];
  opcion : string = "";

  constructor(public firebase:FirebaseService, public router:Router) { 
    this.firebase.recuperar().subscribe((res: any) => {
      this.libros = res;
      console.log(this.libros);
    });
    this.opcion="All";
  }

  ngOnInit(): void {
  }

  descargar(titulo:string){
    this.router.navigate(["/qr", titulo]);
  }
  
  buscarLibro(titulo:string){
    this.router.navigate(["/libro", titulo]);
  }

  cambioOpcion(filtro:string){
    this.opcion = filtro;
    alert(this.opcion);
  }
}
