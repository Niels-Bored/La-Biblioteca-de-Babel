import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public httpClient: HttpClient) { }

  insertar(libro:string, autor:string, isbn:string, precio:number) {
    return this.httpClient.get(`http://localhost:3000/insercion/?titulo=${libro}&autor=${autor}&isbn=${isbn}&precio=${precio}`);
  }
  recuperar(){
    return this.httpClient.get(`http://localhost:3000/recuperacion`);
  }
  recuperarLibro(libro:string){
    return this.httpClient.get(`http://localhost:3000/recuperacion/${libro}`);
  }
  eliminarLibro(libro:string){
    return this.httpClient.get(`http://localhost:3000/eliminacion/${libro}`);
  }

  insertarUsuario(mail:string, phone:string, password:string, displayName:string, photoUrl:string) {
    return this.httpClient.get(`http://localhost:3000/insercionUsuario/?mail=${mail}&phone=${phone}&password=${password}&displayName=${displayName}&photoUrl=${photoUrl}`);
  }
}
