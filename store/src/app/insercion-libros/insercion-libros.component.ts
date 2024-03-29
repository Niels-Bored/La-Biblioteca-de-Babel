import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/spinner.service';
import { AccesibilidadService } from '../accesibilidad.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  formularioContacto = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required])
  });

  datos : any;
  libros : any[] = [];

  constructor(public firebase:FirebaseService, private spinnerService: SpinnerService, public accesib: AccesibilidadService, public router:Router) { 
    this.recuperar();
  }
  ngOnInit(): void {
    //this.spinnerService.llamarSpinner();
  }

  insertar(): void {
    this.firebase.insertar(this.titulo,this.autor,this.genero,this.sinopsis,this.imagen,this.url, 0).subscribe((res: any) => {
      console.log(res);
    });
    alert("Libro insertado éxitosamente");
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


