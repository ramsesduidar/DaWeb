var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'CityBike-Login' });
});

var { authRouter, addValue } = require('./auth');

/* oauth2 token and claims. */
router.get('/oauth2', function(req, res, next) {
  var info = JSON.parse(req.cookies["jwtToken"]);
  console.log(info);
  var token = info.token;
  var claims = info.claims;
  var username = info.claims.sub;
  
  addValue(username, info);

  // Código JavaScript que se ejecutará en el navegador del cliente 
  // para establecer el localStorage y enviar los claims y token a la ruta /auth
  const script = `
  localStorage.setItem("token", \"${token}\");
  localStorage.setItem("claims", JSON.stringify(${JSON.stringify(claims)}));
  localStorage.setItem("username", \"${username}\");

  window.location.href = \`http://localhost:3000/profile/${username}\`;
  `;

  // Enviar el código JavaScript al cliente para ejecutarlo
  res.send(`<script>${script}</script>`);
});

module.exports = router;


