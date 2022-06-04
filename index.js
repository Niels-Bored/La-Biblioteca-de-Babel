const express = require("express"); //importar express
const bodyParser = require("body-parser");
const misRutas = require("./routes/rutas");
const cors = require("cors");

//Configuración firebase
var admin = require("firebase-admin");
var serviceAccount = require("./store-a8c07-firebase-adminsdk-omxtq-41fba392f0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express(); //crear al servidor
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use('/', misRutas);
app.use(cors());
const db = admin.firestore();

app.get('/insercion', (req, res) => {    
    console.log(req.query.titulo);
    const datosLibro = {
        Titulo: req.query.titulo,
        Autor: req.query.autor,
        ISBN_Code: req.query.isbn,
        Precio: req.query.precio
    };
    db.collection('Libros').doc(req.query.titulo).set(datosLibro).then(()=>{
        console.log("Nuevo libro");
    })
    res.send({
        insercion: "true"
    });
});

app.get('/recuperacion', (req, res) => {    
    
    res.send({
        recuperacion: "true"
    });
});

app.listen(port, () => {
 console.log(`servidor corriendo en http://localhost:${port}`);
})
