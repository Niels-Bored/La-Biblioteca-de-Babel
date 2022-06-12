import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogged = this.firebase.getUserLogged();

  id:any = "";
  usuario={
    email: '',
    password: ''
  }
  constructor(public firebase:FirebaseService, private router:Router) { 
  }
  
  Ingresar(){
    console.log(this.usuario);
    const { email, password } = this.usuario;
    this.firebase.login(email,password).then(res =>{
      console.log("Ingreso: ", res);
      this.id = res?.user?.uid;
    });
    //Se necesita una forma de encontrar el id del usuario, la de arriba no funciona, pues el valor no sale del método
    console.log("El id es: "+this.id);
    
    this.firebase.datosAccesibilidad(this.id).subscribe((res: any) => {
      console.log(res);
    });
    this.router.navigate(['inicio']);
  }

  logOut(){
    this.firebase.logout();
    this.router.navigate(['inicio']);
  }
  ngOnInit(): void {
  }

}
