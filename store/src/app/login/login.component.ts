import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogged = this.firebase.getUserLogged();
  usuario={
    email: '',
    password: ''
  }
  constructor(public firebase:FirebaseService) { 
  }
  
  Ingresar(){
    console.log(this.usuario);
    const { email, password } = this.usuario;
    this.firebase.login(email,password).then(res =>{
      console.log("Ingreso ", res);
    });
  }

  logOut(){
    this.firebase.logout();
  }
  ngOnInit(): void {
  }

}
