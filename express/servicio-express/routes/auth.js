var express = require('express');
var router = express.Router();

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var diccionario = {};

/* GET token and claims. */
router.get('/:username', function(req, res, next) {
    if(diccionario[req.params.username])
        res.status(200).send(diccionario[req.params.username])
    else{
        res.status(404).send("No existen valores para el usuario: " + req.params.username);
    }
});

/* DELETE token and claims. */
router.delete('/:username', function(req, res, next) {
    let username = req.params.username;
    delete diccionario[username];
    console.log(diccionario);
    res.status(204).send();
  });

/* POST token and claims. */
router.post('/:username', function(req, res, next) {
    var valores = req.body;
    console.log(valores);
    
    var username = req.params.username;
    if(valores.claims.sub != username){
        res.status(400).send("El usuario especificado en la ruta no coincide con el de los claims");
    }
    else{
        diccionario[req.params.username] = valores;
        res.status(204).send();
    }
});

module.exports = router;

