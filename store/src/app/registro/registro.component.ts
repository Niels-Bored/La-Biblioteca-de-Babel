import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { CustomValidators } from '../registro.validator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  forma!: FormGroup;  
  userName:string="";
  mail:string="";
  phone:string="";
  pass_1:string ="";
  pass_2:string ="";
  sexo:string ="";
  
  url:string="";
  usuarios : any;

  constructor(public firebase:FirebaseService, private router:Router,private fb: FormBuilder) { 
    createSignupForm():FormGroup{
      return this.fb.group(
        {
      'userName': new FormControl(this.userName,[Validators.required,Validators.minLength(3)] ),
      'mail': new FormControl(this.mail,[Validators.required,Validators.email]),
      'phone': new FormControl(this.phone,[Validators.required,Validators.pattern('[0-9]{1,15}')]),
      'pass_1': new FormControl([ null, Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // 5. check whether the entered password has a special character
        CustomValidators.patternValidator(/[ [!@#$%^&*()_+-=[]{};':"|,.<>/, { hasSpecialCharacters: true }),
        // 6. Has a minimum length of 8 characters
        Validators.minLength(8)]),
      ]),
     'pass_2': new FormControl(["", Validators.compose([Validators.required])]),
      'sexo': new FormControl(this.sexo,Validators.required)
    },
    // check whether our password and confirm password match
    Validators: CustomValidators.passwordMatchValidator
    )};
    this.consultaDatos();
    
  }

  insertarUsuario(){
    this.firebase.insertarUsuario(this.mail, this.phone,this.pass_1,this.userName,this.url).subscribe((res: any) => {
      console.log(res);
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Registro exitoso!',
      showConfirmButton: false,
      timer: 2000
    });

    this.router.navigate(['inicio']);
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
