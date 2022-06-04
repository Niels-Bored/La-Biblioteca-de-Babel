const express = require("express"); // Importar express
const router = express.Router();

router.use(express.static(process.cwd()+"/store/dist/store/"));

router.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/store/dist/store/index.html")
});

module.exports = router;