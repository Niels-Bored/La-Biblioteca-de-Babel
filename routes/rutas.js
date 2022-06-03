const express = require("express"); // Importar express
const router = express.Router();
const baseDatos = require("../firebase");

router.use(express.static(process.cwd()+"/store/dist/store/"));

router.get('/insercion/:libro', (req, res) => {
    const { libro } = req.params;
    
    baseDatos.insercion(libro);

    console.log(libro);
    res.send({
        insercion: "true"
    });
});

router.get('/recuperacion', (req, res) => {
    baseDatos.recuperacion();
    res.send({
        recuperacion: "true"
    });
});

router.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/store/dist/store/index.html")
});

module.exports = router;