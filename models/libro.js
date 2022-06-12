class Libro{
    constructor(Titulo, Autor, ISBN_Code, Sinopsis, Precio, Imagen){
        this.Titulo = Titulo;
        this.Autor = Autor;
        this.ISBN_Code = ISBN_Code;
        this.Sinopsis = Sinopsis;
        this.Precio = Precio;
        this.Imagen = Imagen;
    }
}

module.exports = Libro;