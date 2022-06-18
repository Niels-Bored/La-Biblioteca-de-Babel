import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { contrasenasConfirm } from '../registro.validator';
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
  pass_1:string ="";
  pass_2:string ="";
  
  url:string="";
  usuarios : any;

  band:boolean=false;

  constructor(public firebase:FirebaseService, private router:Router, private fb:FormBuilder) { 

    this.formu = new FormGroup({
      'userName': new FormControl(this.userName,[Validators.required,Validators.minLength(3)] ),
      'mail': new FormControl(this.mail,[Validators.required,Validators.email]),
      'phone': new FormControl(this.phone,Validators.required),
      'pass_1': new FormControl(this.pass_1,
        // 1. Password Field is Required
        Validators.required
        // 2. check whether the entered password has a number
        //CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        //CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        //CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true })]
        ),
      'pass_2': new FormControl(this.pass_2,Validators.required)
    }, {
      validators: contrasenasConfirm
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

  confirmPass():boolean | undefined {
    return this.formu.hasError('noSonIguales') &&
      this.formu.get('pass_1') ?.dirty &&
      this.formu.get('pass_2') ?.dirty ; 
  }

  ngOnInit(): void {
  }

}
