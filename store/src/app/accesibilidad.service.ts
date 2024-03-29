import { Injectable } from '@angular/core';
// import { AnalyticsComponent } from './analytics/analytics.component';

@Injectable({
  providedIn: 'root'
})
export class AccesibilidadService {
  private usuarios: Usuario[];
  activo: string = "";
  tamano: number = 20;
  fondo: string = "";
  nav: string = "white";
  nav_letra: string = "black";
  borde: string = "#F0E7E6";
  color: string = "";
  footer: string = "#C6DCE4";
  b_color: string = "white";
  enter: string = "rgba(33, 5, 189, 0.871)";
  bootstrap: string = "info";
  ayuda: string = "#F2D1D1";
  grafica1: string[] = ["#FFE6E6", "#F2D1D1", "#DAEAF1", "#C6DCE4", "#CDF0EA"];
  tayuda: string = "#FFE6E6";
  presentacion = {
    'color': this.color,
    'font-size.px': this.tamano,
  };
  filtro: string = "brightness(1%)";
  icono: string = "../../assets/Accesibilidad/icono_normal.png";
  img0: string = "../../assets/Insercion/Nubes.jpg ";
  img1: string = " ../../assets/Inicio/logo.png";
  img2: string = "";
  f_logo: string = "../../assets/Inicio/fimagen.png";
  redes0 = "../../assets/Inicio/gmail.png";
  redes1 = "../../assets/Inicio/twitter.png";
  redes2 = "../../assets/Inicio/instagram.png";

  constructor() {
    this.usuarios = JSON.parse(localStorage.getItem('datos') || '[]');
  }
  getFondo(id: string): any {
    let valor = "";
    for (var i in this.usuarios) {
      if (this.usuarios[i].id == id) {
        valor = this.usuarios[i].fondo;
      }
    }
    if (valor == "") {
      this.usuarios.push(this.nuevoUsuario(id));
      localStorage.setItem('datos', JSON.stringify(this.usuarios));
      valor = "normal";
    }
    return valor;
  }
  nuevoUsuario(id: string): Usuario {
    return {
      id: id,
      tamano: 20,
      fondo: 'Normal'
    };
  }

  getTamano(id: string): any {
    let valor = 0;
    for (var i in this.usuarios) {
      if (this.usuarios[i].id == id) {
        valor = this.usuarios[i].tamano;
      }
    }
    if (valor == 0) {
      this.usuarios.push(this.nuevoUsuario(id));
      localStorage.setItem('datos', JSON.stringify(this.usuarios));
      valor = 20;
    }
    return valor;
  }

  actualizar(id: string, fondo: string, tamano: number) {
    for (var i in this.usuarios) {
      if (this.usuarios[i].id == id) {
        this.usuarios[i].fondo = fondo;
        this.usuarios[i].tamano = tamano;
      }
    }
    this.setDatos(fondo, tamano);
  }

  setDatos(fondo: string, tamano: number) {
    this.tamano = tamano;
    switch (fondo) {
      case "Escala de Grises":
        this.presentacion['color'] = "black";
        this.b_color = "white";
        this.bootstrap = "secondary";
        this.nav = "white";
        this.nav_letra = "black";
        this.borde = "#F0E7E6";
        this.icono = "../../assets/Accesibilidad/icono_gris.png";
        this.img0 = "../../assets/Accesibilidad/fondo_gris_0.png";
        this.enter = "grey";
        this.footer = "#CDD0CB";
        this.filtro = "grayscale(100%)";
        this.ayuda = "#E0DECA";
        this.tayuda = "#EEEEEE";
        this.grafica1 = ["#DAD0C2", "#D6D2C4", "#C8C2BC", "#CDC7BE", "#E4D3CF"];
        break;
      case "Normal":
        this.presentacion['color'] = "black";
        this.b_color = "white";
        this.bootstrap = "info";
        this.nav = "white";
        this.nav_letra = "gray";
        this.borde = "#F0E7E6";
        this.icono = "../../assets/Accesibilidad/icono_normal.png";
        this.img0 = "../../assets/Insercion/Nubes.jpg";
        this.enter = "rgba(33, 5, 189, 0.871)";
        this.footer = "#C6DCE4";
        this.filtro = "brightness(100%)";
        this.ayuda = "#F2D1D1";
        this.tayuda = "#FFE6E6";
        this.grafica1 = ["#FFE6E6", "#F2D1D1", "#DAEAF1", "#C6DCE4", "#CDF0EA"];
        break;
      case "Alto Contraste":
        this.presentacion['color'] = "blue";
        this.b_color = "info";
        this.bootstrap = "dark";
        this.nav = "black";
        this.nav_letra = "cyan";
        this.borde = "black";
        this.icono = "../../assets/Accesibilidad/icono_normal.png";
        this.img0 = "../../assets/Accesibilidad/fondo_alto_0.png";
        this.enter = "black";
        this.footer = "#3E065F";
        this.filtro = "contrast(200%)";
        this.ayuda = "#3E065F";
        this.tayuda = "#000000";
        this.grafica1 = ["#F806CC", "#570A57", "#A91079", "#4C0027", "#610094"];
        break;
    }
    this.cambiarIcono(fondo);
  }

  cambiarFondo(e: any) {
    this.fondo = e.target.value;
    switch (e.target.value) {
      case "Escala de Grises":
        this.presentacion['color'] = "black";
        this.b_color = "white";
        this.bootstrap = "secondary";
        this.nav = "white";
        this.nav_letra = "black";
        this.borde = "#F0E7E6";
        this.icono = "../../assets/Accesibilidad/icono_gris.png";
        this.img0 = "../../assets/Accesibilidad/fondo_gris_0.png";
        this.enter = "grey";
        this.filtro = "grayscale(100%)";
        this.ayuda = "#E0DECA";
        this.tayuda = "#EEEEEE";
        this.grafica1 = ["#DAD0C2", "#D6D2C4", "#C8C2BC", "#CDC7BE", "#E4D3CF"];
        break;
      case "Normal":
        this.presentacion['color'] = "black";
        this.b_color = "white";
        this.bootstrap = "info";
        this.nav = "white";
        this.nav_letra = "gray";
        this.borde = "#F0E7E6";
        this.icono = "../../assets/Accesibilidad/icono_normal.png";
        this.img0 = "../../assets/Insercion/Nubes.jpg";
        this.enter = "rgba(33, 5, 189, 0.871)";
        this.filtro = "brightness(100%)";
        this.ayuda = "#F2D1D1";
        this.tayuda = "#FFE6E6";
        this.grafica1 = ["#FFE6E6", "#F2D1D1", "#DAEAF1", "#C6DCE4", "#CDF0EA"];
        break;
      case "Alto Contraste":
        this.presentacion['color'] = "blue";
        this.b_color = "info";
        this.bootstrap = "dark";
        this.nav = "black";
        this.nav_letra = "cyan";
        this.borde = "black";
        this.icono = "../../assets/Accesibilidad/icono_normal.png";
        this.img0 = "../../assets/Accesibilidad/fondo_alto_0.png";
        this.enter = "black";
        this.filtro = "contrast(200%)";
        this.ayuda = "#3E065F";
        this.tayuda = "#000000";
        this.grafica1 = ["#F806CC", "#570A57", "#A91079", "#4C0027", "#610094"];
        break;
    }
    this.cambiarIcono(this.fondo);
    this.actualizar(this.activo, this.fondo, this.tamano);
    //this.Grafica.generaGraf();
  }
  cambiarIcono(fondo: string) {
    switch (fondo) {
      case "Escala de Grises":
        this.redes0 = "../../assets/Inicio/gmail_gris.png";
        this.redes1 = "../../assets/Inicio/twitter_gris.png";
        this.redes2 = "../../assets/Inicio/instagram_gris.png";
        this.f_logo = "../../assets/Inicio/fimagen_gris.png";
        this.img1 = "../../assets/Inicio/logo_gris.png";
        break;
      case "Normal":
        this.redes0 = "../../assets/Inicio/gmail.png";
        this.redes1 = "../../assets/Inicio/twitter.png";
        this.redes2 = "../../assets/Inicio/instagram.png";
        this.f_logo = "../../assets/Inicio/fimagen.png";
        this.img1 = "../../assets/Inicio/logo.png";
        break;
      case "Alto Contraste":
        this.redes0 = "../../assets/Inicio/gmail_contraste.png";
        this.redes1 = "../../assets/Inicio/twitter_contraste.png";
        this.redes2 = "../../assets/Inicio/instagram_contraste.png";
        this.f_logo = "../../assets/Inicio/fimagen_contraste.png";
        this.img1 = "../../assets/Inicio/logo_contraste.png";
        break;
    }
  }

  setActivo(id: string) {
    this.activo = id;
    this.tamano = 20;
    this.fondo = "";
    this.nav = "white";
    this.nav_letra = "black";
    this.borde = "#F0E7E6";
    this.b_color = "white";
    this.enter = "rgba(33, 5, 189, 0.871)";
    this.bootstrap = "info";
    this.presentacion = {
      'color': this.color,
      'font-size.px': this.tamano,
    };
    this.icono = "../../assets/Accesibilidad/icono_normal.png";
    this.img0 = "../../assets/Insercion/Nubes.jpg ";
  }
  getGrafica1(pos: number) {
    return this.grafica1[pos];
  }
  cambiarTamano(e: any) {
    this.presentacion['font-size.px'] = e.target.value;
    this.tamano = e.target.value;
    this.actualizar(this.activo, this.fondo, this.tamano);
  }
  Match(id: any) {
    let band = false;
    for (var i in this.usuarios) {
      if (this.usuarios[i].id == id) {
        band = true;
        this.fondo = this.usuarios[i].fondo;
        this.tamano = this.usuarios[i].tamano; break;
      }
    }
    if (!band) {
      if (id == null) {
        id = 0;
        for (var i in this.usuarios) {
          if (this.usuarios[i].id == id) {
            console.log("Hay un id 0");
            band = true;
            this.fondo = this.usuarios[i].fondo;
            this.tamano = this.usuarios[i].tamano; break;
          }
        }
        if (!band) {
          console.log("Estamos sin cuenta logueada");
          this.usuarios.push(this.nuevoUsuario(id));
          localStorage.setItem('datos', JSON.stringify(this.usuarios));
          this.fondo = "Normal";
          this.tamano = 20;
        }
      } else {
        console.log("Estamos sin cuenta logueada,pero generó un id");
        this.usuarios.push(this.nuevoUsuario(id));
        localStorage.setItem('datos', JSON.stringify(this.usuarios));
        this.fondo = "Normal";
        this.tamano = 20;
      }

    }
    this.activo = id;
    this.actualizar(id, this.fondo, this.tamano);
    console.log("Entró " + id);
  }
}
interface Usuario {
  id: string;
  tamano: number;
  fondo: string;
}
