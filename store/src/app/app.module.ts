import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseService } from './services/firebase.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';
import { InsercionLibrosComponent } from './insercion-libros/insercion-libros.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { LogincelComponent } from './logincel/logincel.component';
import { ContactoComponent } from './contacto/contacto.component';
import { FormatoTelPipe } from './formato-tel.pipe';
import { QRCodeModule } from 'angularx-qrcode';
import { AyudaComponent } from './ayuda/ayuda.component';
import { VistaLComponent } from './vista-l/vista-l.component';
import { ActualizarLibrosComponent } from './actualizar-libros/actualizar-libros.component';
import { LibroQRComponent } from './libro-qr/libro-qr.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    InsercionLibrosComponent,
    RegistroComponent,
    LoginComponent,
    LogincelComponent,
    ContactoComponent,
    FormatoTelPipe,
    AyudaComponent,
    VistaLComponent,
    ActualizarLibrosComponent,
    LibroQRComponent,
    AnalyticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    QRCodeModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
