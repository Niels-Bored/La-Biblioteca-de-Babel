import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-insercion-libros',
  templateUrl: './insercion-libros.component.html',
  styleUrls: ['./insercion-libros.component.css']
})
export class InsercionLibrosComponent implements OnInit {

  title = 'store';

  titulo:string="";
  autor:string="";
  isbn:string="";
  sinopsis:string="";
  precio:number=0;
  imagen:string="";
  

  datos : any;
  libros : any[] = [];

  constructor(public firebase:FirebaseService) { 
    this.recuperar();
  }
  ngOnInit(): void {
  }

  insertar(): void {
    this.firebase.insertar(this.titulo,this.autor,this.isbn,this.sinopsis,this.precio,this.imagen).subscribe((res: any) => {
      console.log(res);
    });
    alert("Libro insertado éxitosamente");
    this.recuperar();
  }  
  recuperar():void{
    this.firebase.recuperar().subscribe((res: any) => {
      this.libros = res;
      console.log(this.libros);
    });
  }  
  eliminar(libro:string){
    this.firebase.eliminarLibro(libro).subscribe((res: any) => {
      console.log(res);
    });
    alert("Libro eliminado éxitosamente");
    this.recuperar();
  }

}


