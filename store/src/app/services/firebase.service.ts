import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from "@angular/fire/compat/auth";
/*Para la librería  de arriba se necesita:
npm i firebase
npm i @angular/fire
npm i @firebase/auth */

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public httpClient: HttpClient, private afauth:AngularFireAuth) { }

  insertar(libro:string, autor:string, isbn:string, sinopsis:string, precio:number, imagen:string) {
    return this.httpClient.get(`http://localhost:3000/insercion/?titulo=${libro}&autor=${autor}&isbn=${isbn}&sinopsis=${sinopsis}&precio=${precio}&imagen=${imagen}`);
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

  enviarCorreo(mensaje:string){
    return this.httpClient.get(`http://localhost:3000/enviarCorreo/${mensaje}`);
  }

  insertarUsuario(mail:string, phone:string, password:string, displayName:string, photoUrl:string) {
    return this.httpClient.get(`http://localhost:3000/insercionUsuario/?mail=${mail}&phone=${phone}&password=${password}&displayName=${displayName}&photoUrl=${photoUrl}`);
  }

  consultaDatos(){
    return this.httpClient.get(`http://localhost:3000/datosu`);
  }

  async login(email: string, password: string){
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("error en login: ",error);
      return null;
    }
  }

  getUserLogged(){
    return this.afauth.authState;
  }

  logout(){
    this.afauth.signOut();
  }

  get windowRef() {
    return window
  }
}
