import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from "./inicio/inicio.component";
import { InsercionLibrosComponent } from "./insercion-libros/insercion-libros.component";
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { HaceradminComponent } from './haceradmin/haceradmin.component';
import { LogincelComponent } from './logincel/logincel.component';
import { ContactoComponent } from './contacto/contacto.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { ActualizarLibrosComponent } from './actualizar-libros/actualizar-libros.component';
import { VistaLComponent } from './vista-l/vista-l.component';
import { LibroQRComponent } from './libro-qr/libro-qr.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'incersionLibros', component: InsercionLibrosComponent },
  { path: 'actualizarLibros/:titulo', component: ActualizarLibrosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component:  RegistroComponent},
  { path: 'actusu', component: HaceradminComponent },
  { path: 'logincel', component: LogincelComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: 'libros', component: VistaLComponent },
  { path: 'qr/:titulo', component: LibroQRComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
