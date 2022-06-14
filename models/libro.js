class Libro{
    constructor(Titulo, Autor, Genero, Sinopsis, Descargas, Imagen, url){
        this.Titulo = Titulo;
        this.Autor = Autor;
        this.Genero = Genero;
        this.Sinopsis = Sinopsis;
        this.Descargas = Descargas;
        this.Imagen = Imagen;
        this.url = url;
    }
}

module.exports = Libro;