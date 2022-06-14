import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service'; 

@Component({
  selector: 'app-libro-qr',
  templateUrl: './libro-qr.component.html',
  styleUrls: ['./libro-qr.component.css']
})
export class LibroQRComponent implements OnInit {

  titulo:string = "";

  constructor(public activatedRoute:ActivatedRoute, public firebase:FirebaseService) { 
    this.activatedRoute.params.subscribe(params=>{
      this.titulo = params['titulo'];
    })
  }

  ngOnInit(): void {
  }

}
