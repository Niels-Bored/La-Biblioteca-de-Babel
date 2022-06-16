import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {
  titulo:string="";
  autor:string="";
  genero:string="";
  sinopsis:string="";
  url:string="";
  imagen:string="";
  descargas:number = 0;
  libro:any;
  mostrar:boolean=false;

  constructor(public activatedRoute:ActivatedRoute, public firebase:FirebaseService, public router:Router) {
    this.activatedRoute.params.subscribe(params=>{
      this.titulo = params['titulo'];
      this.libro = this.firebase.recuperarLibro(this.titulo).subscribe((res: any) => {
        this.libro = res;
        this.mostrar = true;
      }, (error:any) =>{
        console.log("Ha habido un problema");
        this.mostrar = false;
      });
    });
    this.autor = this.libro['Autor'];
    this.sinopsis = this.libro['Sinopsis'];
    this.imagen = this.libro['Imagen'];
   }

  ngOnInit(): void {
  }
  descargar(titulo:string){
    this.router.navigate(["/qr", titulo]);
  }

}
