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
  

  constructor(public firebase:FirebaseService, public router:Router) { 
    this.firebase.recuperar().subscribe((res: any) => {
      this.libros = res;
      console.log(this.libros);
    });
  }

  ngOnInit(): void {
    for (let i = 0; i < this.libros.length; i++) {
      // const element[i] = array[i];
    }
    const grafica = new Chart("mychart", {
      type: 'bar',
      data:{
        labels:["Hola"],
        datasets:[{
          label: 'Prueba',
          data: ["87"]
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
