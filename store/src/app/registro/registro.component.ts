import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formu!: FormGroup;  
  userName:string="";
  mail:string="";
  phone:string="";
  pass_1:string="";
  pass_2:string="";
  
  url:string="";
  usuarios : any;

  constructor(public firebase:FirebaseService, private router:Router) { 

    this.formu = new FormGroup({
      'userName': new FormControl(this.userName,[Validators.required,Validators.minLength(3)] ),
      'mail': new FormControl(this.mail,[Validators.required,Validators.email]),
      'phone': new FormControl(this.phone,Validators.required),
      'password_1': new FormControl(this.pass_1,
        // 1. Password Field is Required
        Validators.required
        // 2. check whether the entered password has a number
        //CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        //CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        //CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true })]
        ),
      'password_2': new FormControl(this.pass_2,Validators.required),
    });

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
