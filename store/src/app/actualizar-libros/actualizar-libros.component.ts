import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualizar-libros',
  templateUrl: './actualizar-libros.component.html',
  styleUrls: ['./actualizar-libros.component.css']
})
export class ActualizarLibrosComponent implements OnInit {

  titulo:string="";
  autor:string="";
  genero:string="";
  sinopsis:string="";
  url:string="";
  imagen:string="";
  libro:any;

  constructor(public activatedRoute:ActivatedRoute, public firebase:FirebaseService, public router:Router) { 
    this.activatedRoute.params.subscribe(params=>{
      this.titulo = params['titulo'];
      this.libro = this.firebase.recuperarLibro(this.titulo).subscribe((res: any) => {
        this.libro = res;
        console.log(this.libro);
      });
    })
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
      this.imagen = this.libro['Imagen'];
    
    this.firebase.insertar(this.titulo,this.autor,this.genero,this.sinopsis,this.imagen,this.url, this.libro['Descargas']).subscribe((res: any) => {
      console.log(res);
    });
    alert("Libro actualizado éxitosamente");
    this.router.navigate(['/incersionLibros']);
  }

}
