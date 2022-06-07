const express = require("express"); //importar express
const bodyParser = require("body-parser");
const misRutas = require("./routes/rutas");
const Libro = require("./models/libro");
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
const at = admin.auth();
const db = admin.firestore();

//Insercion usuario
app.get('/insercionUsuario', (req, res) =>{
    console.log(req.query.mail);
    console.log("+"+req.query.phone);
    console.log(req.query.password);
    at.createUser({
        email: req.query.mail,
        emailVerified: false,
        phoneNumber: "+"+req.query.phone,
        password: req.query.password,
        displayName: req.query.displayName,
        photoURL: req.query.photoUrl,
        disabled: false,
        //rol:"admin",
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
        res.send({
            insercion: "true"
        });
      })
      .catch((error) => {
        console.log('Error creating new user:', error);
        res.send({
            insercion: "false"
        });
      });
});

//Insertar libros
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

//Recuperar todos los libros
app.get('/recuperacion', async (req, res) => {    
    try{
        const libros = await db.collection('Libros').get();

        const librosArreglo = [];

        if(!libros.empty){
            libros.forEach(doc =>{
                const libro = new Libro(
                    doc.data().Titulo,
                    doc.data().Autor,
                    doc.data().ISBN_Code,
                    doc.data().Precio
                );
                librosArreglo.push(libro);
            });
            console.log(librosArreglo);
            res.send(librosArreglo);
        }else{
            res.status(404).send('No hay libros por mostrar');
        }
    }catch(error){
        res.status(404).send(error.message);
    }
});

//Recuperar un libro especifico
app.get('/recuperacion/:nombre', async (req, res) => {    
    try{
        const { nombre } = req.params;

        const libro = await db.collection('Libros').doc(nombre).get();

        if (!libro.exists) {
            res.status(404).send('No hay un libro con ese nombre');
        } else {
            res.send(libro.data());
        }
    } catch(error){
        res.status(404).send(error.message);
    }
});

app.get('/eliminacion/:nombre', async (req, res) => {   
    try{
        const { nombre } = req.params;

        await db.collection('Libros').doc(nombre).delete();
        res.send("Libro eliminado");
    } catch(error){
        res.status(404).send(error.message);
    }
});

app.listen(port, () => {
 console.log(`servidor corriendo en http://localhost:${port}`);
})
