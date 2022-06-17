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
  descargasaux : any[] = [];
  orden : any[] = [];
  nombres: any[] = [];
  gen:any[] = [];

  topD:any[] = [];
  topN:any[] = [];
  

  generos: any[] = ["Dark Humor","Fantasy","Romance","Science Fiction","Terror","Thriller","Other"];
  numGen: number[] = [0,0,0,0,0,0,0];  

  constructor(public firebase:FirebaseService, public router:Router) { 
    this.firebase.recuperar().subscribe((res: any) => {
      this.libros = res;
      console.log(this.libros);
    });
    setTimeout(() => {  
      this.generaGraf();
    }, 4000);
  }
  ngOnInit(): void {
    
  }

  generaGraf(){
    for (let i = 0; i < this.libros.length; i++) {
      this.descargas[i] = parseInt(this.libros[i]['Descargas']);
      this.descargasaux[i] = this.descargas[i];
      this.nombres[i] = this.libros[i]['Titulo'];
      this.gen[i] = this.libros[i]['Genero'];
    }
    this.descargasaux.sort((a,b)=>a-b);
    var x = 0;
    for (let index = this.descargas.length-1; index >= this.descargas.length-10; index--) {
      this.orden[x++] =  this.descargas.indexOf(this.descargasaux[index])
    }
    for (let j = 0; j < 10; j++) {
      this.topD[j] = this.descargas[this.orden[j]];
      this.topN[j] = this.nombres[this.orden[j]] 
    }

    const graficatop = new Chart("top10", {
      type: 'bar',
      data:{
        labels:this.topN,
        datasets:[{
          label: 'Descargas',
          data: this.topD
        }]
      },
      options: {
        scales:{
          y:{
            beginAtZero:true
          }
        },
        responsive:true
      }
    });

    for (let index = 0; index < this.libros.length; index++) {
      switch (this.gen[index]) {
        case 'Dark Humor':
          this.numGen[0]++;
          break;
        case 'Fantasy':
          this.numGen[1]++;
          break;
        case 'Romance':
          this.numGen[2]++;
          break;
        case 'Science Fiction':
          this.numGen[3]++;
          break;
        case 'Terror':
          this.numGen[4]++;
          break;
        case 'Thriller':
          this.numGen[5]++;
          break;
        default:
          this.numGen[6]++;
          break;
      }
    }
    
    const graficat = new Chart("topCat", {
      type: 'pie',
      data:{
        labels:this.generos,
        datasets:[{
          label: 'Descargas',
          data: this.numGen
        }]
      },
      options: {
        scales:{
          y:{
            beginAtZero:true
          }
        },
        responsive:true
      }
    });
    
  }

}
