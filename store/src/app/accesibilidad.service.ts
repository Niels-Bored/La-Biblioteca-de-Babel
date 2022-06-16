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
    let valor="";
    for (var i in this.usuarios) {
      if (this.usuarios[i].id == id) {
        valor = this.usuarios[i].fondo;
      }
    }
    if(valor==""){
      this.usuarios.push(this.nuevoUsuario(id));
      localStorage.setItem('datos', JSON.stringify(this.usuarios));
      valor="normal";
    }
    return valor;
  }
  nuevoUsuario(id:string): Usuario {
    return {
      id: id,
      tamano: 20,
      fondo: 'normal'
    };
  }

  getTamano(id : string):any {
    let valor=0;
    for (var i in this.usuarios) {
      if (this.usuarios[i].id == id) {
        valor = this.usuarios[i].tamano;
      }
    }
    if(valor==0){
      this.usuarios.push(this.nuevoUsuario(id));
      localStorage.setItem('datos', JSON.stringify(this.usuarios));
      valor=20;
    }
    return valor;
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
