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

  id:any;
  usuario={
    email: '',
    password: ''
  }
  constructor(public firebase:FirebaseService, private router:Router) { 
  }
  Ingresar() {
    console.log(this.usuario);
    const { email, password } = this.usuario;
    this.firebase.login(email,password).then(res =>{
      console.log("Ingreso: ", res?.user?.displayName);
      this.id = res?.user?.uid;
    });

    setTimeout(() => {  
      console.log("El id es: "+this.id);
      
      this.firebase.datosAccesibilidad(this.id).subscribe((res: any) => {
        //Aquí guardan en  Local los datos de la accesibilidad con res
         //console.log(res);
      });
      this.router.navigate(['inicio']);
    }, 5000);
    
  }

  logOut() {
    this.firebase.logout();
    this.router.navigate(['inicio']);
  }
  ngOnInit(): void {
  }

}
