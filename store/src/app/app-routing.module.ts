import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from "./inicio/inicio.component";
import { InsercionLibrosComponent } from "./insercion-libros/insercion-libros.component";

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'incersionLibros', component: InsercionLibrosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
