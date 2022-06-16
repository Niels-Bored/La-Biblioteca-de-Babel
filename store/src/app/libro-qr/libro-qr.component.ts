import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service'; 

@Component({
  selector: 'app-libro-qr',
  templateUrl: './libro-qr.component.html',
  styleUrls: ['./libro-qr.component.css']
})
export class LibroQRComponent implements OnInit {

  titulo:string="";
  autor:string="";
  genero:string="";
  sinopsis:string="";
  url:string="Gracias por esperar";
  imagen:string="";
  descargas:number = 0;
  libro:any;

  constructor(public activatedRoute:ActivatedRoute, public firebase:FirebaseService) { 
    this.activatedRoute.params.subscribe(params=>{
      this.titulo = params['titulo'];
      this.libro = this.firebase.recuperarLibro(this.titulo).subscribe((res: any) => {
        this.libro = res;
      });
    });
    setTimeout(() => {  
      this.actualizarDescargas();
    }, 1000);
    
  }

  ngOnInit(): void {
  }
  actualizarDescargas(): void {
    this.autor = this.libro['Autor'];
    this.genero = this.libro['Genero'];
    this.sinopsis = this.libro['Sinopsis'];
    this.url = this.libro['url'];
    this.imagen = this.libro['Imagen'];
    this.descargas = parseInt(this.libro['Descargas']) + 1;

    this.firebase.insertar(this.titulo,this.libro['Autor'],this.genero,this.sinopsis,this.imagen,this.url, this.descargas).subscribe((res: any) => {
      console.log(res);
    });
  }

  
}
