var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Código JavaScript que se ejecutará en el navegador del cliente para limpiar el localStorage
  const script = `
    // Limpiar el localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("claims");
    console.log('¡localStorage limpiado!');
    window.location.href = "http://localhost:3030/login";
  `;

  // Enviar el código JavaScript al cliente para ejecutarlo
  res.send(`<script>${script}</script>`);
});

module.exports = router;