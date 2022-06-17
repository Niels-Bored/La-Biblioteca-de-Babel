import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-insercion-libros',
  templateUrl: './insercion-libros.component.html',
  styleUrls: ['./insercion-libros.component.css']
})
export class InsercionLibrosComponent implements OnInit {
  forma!: FormGroup;
  title = 'store';

  titulo:string="";
  autor:string="";
  genero:string="";
  sinopsis:string="";
  imagen:string="";
  url:string="";
  

  datos : any;
  libros : any[] = [];

  constructor(public firebase:FirebaseService) { 
    this.recuperar();

    this.forma = new FormGroup({
      'titulo': new FormControl(this.titulo,Validators.required),
      'autor': new FormControl(this.autor,Validators.required),
      'genero': new FormControl(this.genero,Validators.required),
      'sinopsis': new FormControl(this.sinopsis,Validators.required),
      'imagen': new FormControl(this.imagen,Validators.required),
      'url': new FormControl(this.url,Validators.required)
      });
  }
  ngOnInit(): void {
  }

  insertar(): void {
    this.firebase.insertar(this.titulo,this.autor,this.genero,this.sinopsis,this.imagen).subscribe((res: any) => {
      console.log(res);
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Libro agregado éxitosamente',
      showConfirmButton: false,
      timer: 2000
    });
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
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Libro eliminado éxitosamente',
      showConfirmButton: false,
      timer: 2000
    });
    this.recuperar();
  }

}


