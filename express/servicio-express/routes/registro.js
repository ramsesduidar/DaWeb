var express = require('express');
var router = express.Router();

/* GET form. */
router.get('/', function(req, res, next) {
  res.render('registro-OAuth2', { title: 'CityBike-Registro GitHub' });
});

/* POST form. */
router.post('/', async function(req, res, next) {

    var formulario = req.body;

    console.log(formulario);

    // Obtenemos el token del gestor
    var request = new Request('http://localhost:8090/auth/login', {
        method: 'POST',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            "username": "gestor",
            "password": "gestor"
        })
    })

    var response = await fetch(request);
        
    if(!response.ok)
        return res.status(500).send("Error al registrar el usuario, intentelo de nuevo más tarde")
    
    var data = await response.json();

    // Creamos el codigo de activacion
    var request2 = new Request('http://localhost:8090/codigos', {
        method: 'POST',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${data.token}`,
        }),
        body: JSON.stringify(formulario.id)
    })

    var response2 = await fetch(request2);
        
    if(!response2.ok)
        return res.status(404).send(`El usuario con id ${formulario.id} ya existe`)
    
    var codigo = await response2.text();

    formulario["codigoActivacion"] = codigo;

    console.log(formulario);

    // Creamos el usuario
    var request3 = new Request('http://localhost:8090/usuarios', {
        method: 'POST',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(formulario)
    })

    var response3 = await fetch(request3);
        
    if(!response3.ok)
        return res.status(404).send(`El usuario GitHub ${formulario.oauth2} ya está registrado`)
    
    
    return res.status(response3.status).send();
});

module.exports = router;