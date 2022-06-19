const express = require("express"); //importar express
const bodyParser = require("body-parser");
const misRutas = require("./routes/rutas");
const Libro = require("./models/libro");
const Informacion = require("./models/informacion");
const URL = require("./models/urlM");
var nodemailer = require('nodemailer');
const cors = require("cors");

//Configuración firebase
var admin = require("firebase-admin");
var serviceAccount = require("./store-a8c07-firebase-adminsdk-omxtq-41fba392f0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express(); //crear al servidor
const port = process.env.PORT || 10000;

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use('/', misRutas);
app.use(cors());
const at = admin.auth();
const db = admin.firestore();

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

//Insercion usuario
app.get('/insercionUsuario', (req, res) =>{
    console.log("Datos");
    console.log(req.query.mail);
    console.log("+"+req.query.phone);
    console.log(req.query.password);
    at.createUser({
        email: req.query.mail,
        emailVerified:false,
        phoneNumber: "+"+req.query.phone,
        password: req.query.password,
        displayName: req.query.displayName,
        photoURL: req.query.photoUrl
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);

        const configuracion = {
            letra: 20,
            fondo: 'Normal'
        };

        db.collection('Usuarios').doc(userRecord.uid).set(configuracion).then(()=>{
          console.log("Nuevo libro");
        })

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

//Recupera Datos de usuario 
app.get('/datosu',async (req, res) => {
    at.getUserByEmail('pruebaadmin@gmail.com')
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    const user = userRecord.toJSON();
    res.send(user);
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });
});

//Insertar libros
app.get('/insercion', (req, res) => {    
    console.log(req.query.titulo);
    const datosLibro = {
        Titulo: req.query.titulo,
        Autor: req.query.autor,
        Genero: req.query.genero,
        Sinopsis: req.query.sinopsis,
        Descargas: req.query.descargas,
        Imagen: req.query.imagen,
        url: req.query.url
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
                    doc.data().Genero,
                    doc.data().Sinopsis,
                    doc.data().Descargas,
                    doc.data().Imagen,
                    doc.data().url
                );
                librosArreglo.push(libro);
            });
            //console.log(librosArreglo);
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
            const url = libro.data();
            console.log(url['url']);
            res.send(libro.data());
        }
    } catch(error){
        res.status(404).send(error.message);
    }
});

//Recuperar el url de un libro específico
app.get('/recuperacionURL/:nombre', async (req, res) => {    
  try{
      const { nombre } = req.params;

      const libro = await db.collection('Libros').doc(nombre).get();

      if (!libro.exists) {
          res.status(404).send('No hay un libro con ese nombre');
      } else {
        const url = new URL(
            libro.data().url
        );
          //console.log(url);
          res.send(url);
      }
  } catch(error){
      res.status(404).send(error.message);
  }
});

//Recuperar todas las descargas
app.get('/recuperacionDescargas', async (req, res) => {    
  try{
      const libros = await db.collection('Libros').get();

      const informacionDescargas = [];

      if(!libros.empty){
          libros.forEach(doc =>{
              const descarga = new Informacion(
                  doc.data().Titulo,
                  doc.data().Descargas
              );
              informacionDescargas.push(descarga);
          });
          res.send(informacionDescargas);
      }else{
          res.status(404).send('No hay descargas');
      }
  }catch(error){
      res.status(404).send(error.message);
  }
});

//Recuperar todos los generos
app.get('/recuperacionGeneros', async (req, res) => {    
  try{
      const generos = await db.collection('Libros').get();

      const generoExtraido = [];

      if(!generos.empty){
          generos.forEach(doc =>{
              generoExtraido.push(doc.data().Genero);
          });
          res.send(generoExtraido);
      }else{
          res.status(404).send('No hay generos');
      }
  }catch(error){
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

app.get('/enviarCorreo/:mensaje', (req, res) =>{
    
    const { mensaje } = req.params;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'l4b1bl10t3c4d3b4b3l@gmail.com',
          pass: 'dkqhyuvhtmahrsan'
        }
      });
      
      var mailOptions = {
        from: 'l4b1bl10t3c4d3b4b3l@gmail.com',
        to: 'alberto.sanchez966@gmail.com',
        subject: 'Un usuario te ha contactado!',
        text:mensaje
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send(false);
        } else {
          console.log('Email sent: ' + info.response);
          res.send(true);
        }
      });
});

//Recuperar datos de accesibilidad
app.get('/recuperacionAccesibilidad/:userID', async (req, res) => {    
  try{
    const { userID } = req.params;

    const datos = await db.collection('Usuarios').doc(userID).get();

    
    if (!datos.exists) {
        res.status(404).send('No se encontraron los datos');
    } else {
        res.send(datos.data());
    }
  } catch(error){
      console.log("llegue aquí");
      res.status(404).send(error.message);
  }
});

app.get('/cambiarAccesibilidad', async (req, res) => {    
  try{

    const configuracion = {
        letra: req.query.letra,
        fondo: req.query.fondo
    };

    db.collection('Usuarios').doc(req.query.userID).set(configuracion).then(()=>{
      console.log("Cambios efectuados");
    })

  } catch(error){
      res.status(404).send(error.message);
  }
});

app.get('*', (req,res) => {
  res.sendFile(process.cwd()+"/store/dist/store/index.html")
});

app.listen(port, () => {
 console.log(`servidor corriendo en http://localhost:${port}`);
})

// app.listen(port, () => {
//   console.log(`Node Express server listening on https://<store>.firebaseapp.com:${port}`);
// });