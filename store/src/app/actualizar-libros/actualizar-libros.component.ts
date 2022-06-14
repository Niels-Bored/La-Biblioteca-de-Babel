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
  precio:number=0;
  imagen:string="";

  constructor(public activatedRoute:ActivatedRoute, public firebase:FirebaseService, public router:Router) { 
    this.activatedRoute.params.subscribe(params=>{
      this.titulo = params['titulo'];
    })
  }

  ngOnInit(): void {
  }
  actualizar(): void {
    this.firebase.insertar(this.titulo,this.autor,this.genero,this.sinopsis,this.imagen).subscribe((res: any) => {
      console.log(res);
    });
    alert("Libro actualizado éxitosamente");
    this.router.navigate(['/incersionLibros']);
  }

}
