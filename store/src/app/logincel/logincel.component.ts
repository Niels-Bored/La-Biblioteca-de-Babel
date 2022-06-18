import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from '@firebase/app-compat';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-logincel',
  templateUrl: './logincel.component.html',
  styleUrls: ['./logincel.component.css']
})
export class LogincelComponent implements OnInit {

  telefono:string = "";
  windowRef: any;
  codigoVerif: string = "";
  user: any;

  constructor(private win: FirebaseService, private router:Router) { }

  ngOnInit(): void {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render();
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = "+" + this.telefono;
    firebase.default.auth().signInWithPhoneNumber(num, appVerifier)
            .then((result: any) => {
                this.windowRef.confirmationResult = result;
            })
            .catch( (error: any) => {
              console.log(error) 
              alert("Ha habido un error")
            });
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.codigoVerif)
                  .then( (result: { user: any; }) => {
                    this.user = result.user;
    })
    .catch( (error: any) => {
      console.log(error, "Incorrect code entered?")
      alert("Ha habido un error")
  });
    this.router.navigate(['inicio']);
  }
}