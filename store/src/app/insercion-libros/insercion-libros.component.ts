import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insercion-libros',
  templateUrl: './insercion-libros.component.html',
  styleUrls: ['./insercion-libros.component.css']
})
export class InsercionLibrosComponent implements OnInit {

  title = 'store';

  titulo:string="";
  autor:string="";
  genero:string="";
  sinopsis:string="";
  url:string="";
  imagen:string="";
  

  datos : any;
  libros : any[] = [];

  constructor(public firebase:FirebaseService, public router:Router) { 
    this.recuperar();
  }
  ngOnInit(): void {
  }

  insertar(): void {
    this.firebase.insertar(this.titulo,this.autor,this.genero,this.sinopsis,this.imagen,this.url, 0).subscribe((res: any) => {
      console.log(res);
    });
    alert("Libro insertado éxitosamente");
    this.autor = "";
    this.titulo="";
    this.autor="";
    this.genero="";
    this.sinopsis="";
    this.url="";
    this.imagen="";
    this.recuperar();
  }  
  recuperar():void{
    this.firebase.recuperar().subscribe((res: any) => {
      this.libros = res;
      console.log(this.libros);
    });
  }
  actualizar(titulo:string){
    this.router.navigate(['/actualizarLibros',titulo]);
  }  
  eliminar(libro:string){
    this.firebase.eliminarLibro(libro).subscribe((res: any) => {
      console.log(res);
    });
    alert("Libro eliminado éxitosamente");
    this.recuperar();
  }

}


