import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import Swal from 'sweetalert2';
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
    return this.httpClient.get(`https://la-biblioteca-de-babel.onrender.com/insercion/?titulo=${libro}&autor=${autor}&genero=${genero}&sinopsis=${sinopsis}&imagen=${imagen}&url=${url}&descargas=${descargas}`);
  }
  consultaURL(libro:string){
    return this.httpClient.get(`https://la-biblioteca-de-babel.onrender.com/recuperacionURL/${libro}`);
  }
  consultaDescargas(){
    return this.httpClient.get(`https://la-biblioteca-de-babel.onrender.com/recuperacionDescargas`);
  }
  consultaGeneros(){
    return this.httpClient.get(`https://la-biblioteca-de-babel.onrender.com/recuperacionGeneros`);
  }
  recuperar(){
    return this.httpClient.get(`https://la-biblioteca-de-babel.onrender.com/recuperacion`);
  }
  recuperarLibro(libro:string){
    return this.httpClient.get(`https://la-biblioteca-de-babel.onrender.com/recuperacion/${libro}`);
  }
  eliminarLibro(libro:string){
    return this.httpClient.get(`https://la-biblioteca-de-babel.onrender.com/eliminacion/${libro}`);
  }

  enviarCorreo(mensaje:string){
    return this.httpClient.get(`https://la-biblioteca-de-babel.onrender.com/enviarCorreo/${mensaje}`);
  }

  insertarUsuario(mail:string, phone:string, password:string, displayName:string, photoUrl:string) {
    return this.httpClient.get(`http://localhost:10000/insercionUsuario/?mail=${mail}&phone=${phone}&password=${password}&displayName=${displayName}&photoUrl=${photoUrl}`);
  }

  consultaDatos(){
    return this.httpClient.get(`https://la-biblioteca-de-babel.onrender.com/datosu`);
  }

  datosAccesibilidad(userID:string){
    return this.httpClient.get(`https://la-biblioteca-de-babel.onrender.com/recuperacionAccesibilidad/${userID}`);
  }

  cambiarDatosAccesibilidad(userID:string, letra:string, fondo:string){
    return this.httpClient.get(`https://la-biblioteca-de-babel.onrender.com/cambiarAccesibilidad/?userID=${userID}&letra=${letra}&fondo=${fondo}`);
  }

  async login(email: string, password: string){
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error, datos incorrectos',
        showConfirmButton: false,
        timer: 2000
      });
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
