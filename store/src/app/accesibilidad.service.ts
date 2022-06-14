import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccesibilidadService {
  private usuarios: Usuario[];

  constructor() {
    this.usuarios = JSON.parse(localStorage.getItem('datos') || '[]');
  }
  getFondo(id : string):any {
    for (var i in this.usuarios) {
      if (this.usuarios[i].id == id) {
        return this.usuarios[i].fondo;
      }
    }
  }
  getTamano(id : string):any {
    for (var i in this.usuarios) {
      if (this.usuarios[i].id == id) {
        return this.usuarios[i].tamano;
      }
    }
  }
  
  actualizar(id: string,fondo: string, tamano: number) {
    for (var i in this.usuarios) {
      if (this.usuarios[i].id == id) {
        this.usuarios[i].fondo = fondo;
        this.usuarios[i].tamano = tamano;
      }
    }
  }

}
interface Usuario {
  id: string;
  tamano: number;
  fondo: string;
}
