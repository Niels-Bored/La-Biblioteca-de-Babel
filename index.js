const express = require("express"); //importar express
const bodyParser = require("body-parser");
const misRutas = require("./routes/rutas");
const cors = require("cors");

const app = express(); //crear al servidor
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use('/', misRutas);
app.use(cors());

app.listen(port, () => {
 console.log(`servidor corriendo en http://localhost:${port}`);
 console.log(`Prueba commit`);
})
