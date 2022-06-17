import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  libros : any[] = [];
  descargas : any[] = [];
  nombres: any[] = [];
  generos: any[] = [];
  numGen: number[] = [];
  

  constructor(public firebase:FirebaseService, public router:Router) { 
    this.firebase.recuperar().subscribe((res: any) => {
      this.libros = res;
      console.log(this.libros);
    });
  }
  ngOnInit(): void {
    
  }

}
