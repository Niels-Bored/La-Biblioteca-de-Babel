import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'store';

  titulo:string="";
  autor:string="";
  isbn:string="";
  precio:number=0;
  mail:string="";
  phone:string="";
  password:string="";
  userName:string="";
  url:string="";

  datos : any;
  libros : any[] = [];
  usuarios : any;

  constructor(public firebase:FirebaseService) { 
    this.recuperar();
    this.consultaDatos();
  }
  insertar(): void {
    this.firebase.insertar(this.titulo,this.autor,this.isbn,this.precio).subscribe((res: any) => {
      console.log(res);
    });
    alert("Libro insertado éxitosamente");
    this.recuperar();
  }  
  recuperar():void{
    this.firebase.recuperar().subscribe((res: any) => {
      this.libros = res;
      //console.log(this.libros);
    });
  }  
  eliminar(libro:string){
    this.firebase.eliminarLibro(libro).subscribe((res: any) => {
      console.log(res);
    });
    alert("Libro eliminado éxitosamente");
    this.recuperar();
  }
  insertarUsuario(){
    this.firebase.insertarUsuario(this.mail, this.phone,this.password,this.userName,this.url).subscribe((res: any) => {
      console.log(res);
    });
    alert("Usuario insertado éxitosamente");
  }

  consultaDatos(){
    this.firebase.consultaDatos().subscribe((res: any) => {
      this.usuarios = res;
      console.log(this.usuarios);
    });
  }
}
