var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Código JavaScript que se ejecutará en el navegador del cliente para limpiar el localStorage
  const script = `
  let user = localStorage.getItem("username");

  let req = new Request(\`http://localhost:3030/auth/\${user}\`, {
    method: 'DELETE',
    redirect: 'follow',
  })
  
  fetch(req)
    .then(response => {
        // Limpiar el localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("claims");
        localStorage.removeItem("username");
        console.log('¡localStorage limpiado!');
        window.location.href = "http://localhost:3030/login";
      })
  `;

  // Enviar el código JavaScript al cliente para ejecutarlo
  res.send(`<script>${script}</script>`);
});

module.exports = router;

