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
  url:string="";
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
    this.actualizar();
  }

  ngOnInit(): void {
  }
  actualizar(): void {
    if (this.autor == "") 
      this.autor = this.libro['Autor'];

    if (this.genero == "") 
      this.genero = this.libro['Genero'];
    
    if (this.sinopsis == "") 
      this.sinopsis = this.libro['Sinopsis'];
    
    if (this.url == "") 
      this.url = this.libro['url'];
    
    if (this.imagen == "") 
      this.imagen = this.libro['Genero'];
    this.descargas = this.libro['Descargas'] + 1;
    this.firebase.insertar(this.titulo,this.libro['Autor'],this.genero,this.sinopsis,this.imagen,this.url, this.descargas).subscribe((res: any) => {
    });
  }

  
}
