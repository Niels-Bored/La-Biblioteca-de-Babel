import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from "./inicio/inicio.component";
import { InsercionLibrosComponent } from "./insercion-libros/insercion-libros.component";
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'incersionLibros', component: InsercionLibrosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component:  RegistroComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
