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

  insertar(libro:string, autor:string, genero:string, sinopsis:string, imagen:string, url:string, descargas:number) {
    return this.httpClient.get(`http://localhost:10000/insercion/?titulo=${libro}&autor=${autor}&genero=${genero}&sinopsis=${sinopsis}&imagen=${imagen}&url=${url}&descargas=${descargas}`);
  }
  consultaURL(libro:string){
    return this.httpClient.get(`http://localhost:10000/recuperacionURL/${libro}`);
  }
  consultaDescargas(){
    return this.httpClient.get(`http://localhost:10000/recuperacionDescargas`);
  }
  consultaGeneros(){
    return this.httpClient.get(`http://localhost:10000/recuperacionGeneros`);
  }
  recuperar(){
    return this.httpClient.get(`http://localhost:10000/recuperacion`);
  }
  recuperarLibro(libro:string){
    return this.httpClient.get(`http://localhost:10000/recuperacion/${libro}`);
  }
  eliminarLibro(libro:string){
    return this.httpClient.get(`http://localhost:10000/eliminacion/${libro}`);
  }

  enviarCorreo(mensaje:string){
    return this.httpClient.get(`http://localhost:10000/enviarCorreo/${mensaje}`);
  }

  insertarUsuario(mail:string, phone:string, password:string, displayName:string, photoUrl:string) {
    return this.httpClient.get(`http://localhost:10000/insercionUsuario/?mail=${mail}&phone=${phone}&password=${password}&displayName=${displayName}&photoUrl=${photoUrl}`);
  }

  consultaDatos(){
    return this.httpClient.get(`http://localhost:10000/datosu`);
  }

  datosAccesibilidad(userID:string){
    return this.httpClient.get(`http://localhost:10000/recuperacionAccesibilidad/${userID}`);
  }

  cambiarDatosAccesibilidad(userID:string, letra:string, fondo:string){
    return this.httpClient.get(`http://localhost:10000/cambiarAccesibilidad/?userID=${userID}&letra=${letra}&fondo=${fondo}`);
  }

  async login(email: string, password: string){
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert("Error, datos incorrectos")
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
