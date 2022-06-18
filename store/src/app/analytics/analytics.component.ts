import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { FirebaseService } from '../services/firebase.service';
import { SpinnerService } from 'src/app/spinner.service';
import { AccesibilidadService } from '../accesibilidad.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  libros: any[] = [];
  genaux: any[] = [];
  descargas: any[] = [];
  descargasaux: any[] = [];
  orden: any[] = [];

  nombres: any[] = [];
  gen: any[] = [];
  topD: any[] = [];
  topN: any[] = [];
  generos: any[] = ["Dark Humor", "Fantasy", "Romance", "Science Fiction", "Terror", "Thriller", "Other"];
  numGen: number[] = [0, 0, 0, 0, 0, 0, 0];

  myChart: any;
  myChart2: any;
  ctx: any;

  constructor(public firebase: FirebaseService, public router: Router, private spinnerService: SpinnerService, public accesib: AccesibilidadService) {
    this.firebase.consultaDescargas().subscribe((res: any) => {
      this.libros = res;
      console.log(this.libros);
    });
    this.firebase.consultaGeneros().subscribe((res: any) => {
      this.genaux = res;
      console.log(this.genaux);
    });

    setTimeout(() => {
      this.generaGraf();
    }, 4000);
  }
  ngOnInit(): void {

  }

  generaGraf() {
    for (let i = 0; i < this.libros.length; i++) {
      this.descargas[i] = parseInt(this.libros[i]['Descargas']);
      this.descargasaux[i] = this.descargas[i];
      this.gen[i] = this.genaux[i];
    }
    this.descargasaux.sort((a, b) => a - b);
    var x = 0;
    for (let index = this.descargas.length - 1; index >= this.descargas.length - 10; index--) {
      this.orden[x++] = this.descargas.indexOf(this.descargasaux[index])
    }
    for (let j = 0; j < 10; j++) {
      this.topD[j] = this.libros[this.orden[j]]['Descargas'];
      this.topN[j] = this.libros[this.orden[j]]['Titulo'];
    }

    this.ctx = document.getElementById("top10");
    this.ctx.getContext('2d');
    if (this.myChart) {
      this.myChart.destroy();
    }

    this.myChart = new Chart("top10", {
      type: 'bar',
      data: {
        labels: this.topN,
        datasets: [{
          label: 'Descargas',
          data: this.topD,
          backgroundColor: [
            this.accesib.getGrafica1(0), this.accesib.getGrafica1(1), this.accesib.getGrafica1(2), this.accesib.getGrafica1(3), this.accesib.getGrafica1(4),
          ]
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        maintainAspectRatio: false
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

    this.ctx = document.getElementById("topCat");
    this.ctx.getContext('2d');
    if (this.myChart2) {
      this.myChart2.destroy();
    }

    this.myChart2 = new Chart("topCat", {
      type: 'pie',
      data: {
        labels: this.generos,
        datasets: [{
          label: 'Descargas',
          data: this.numGen,
          backgroundColor: [
            this.accesib.getGrafica1(0), this.accesib.getGrafica1(1), this.accesib.getGrafica1(2), this.accesib.getGrafica1(3), this.accesib.getGrafica1(4),
          ]
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });

  }
}
