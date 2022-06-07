import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  mail:string="";
  phone:string="";
  password:string="";
  userName:string="";
  url:string="";
  usuarios : any;

  constructor(public firebase:FirebaseService) { 
    this.consultaDatos();
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

  ngOnInit(): void {
  }

}
