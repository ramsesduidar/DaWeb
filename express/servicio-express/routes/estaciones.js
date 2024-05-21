var express = require('express');
var router = express.Router();

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const connectToDatabase = require('../repo/RepoMongoDB');
const { ObjectId } = require('mongodb');

/* DELETE token and claims. */
router.delete('/:id', async function(req, res, next) {
  try {

    const db = await connectToDatabase();
    const query = { _id: new ObjectId(req.params.id) };
    console.log(query);
    const collection = db.collection("estacion");
    const biciCollection = db.collection("bici");

    // Verificar si existen reservas asociadas a la estación
    const biciCount = await biciCollection.countDocuments({ idEstacion: req.params.id });

    if (biciCount > 0) {
      // Si hay reservas asociadas, devolver un error
      res.status(400).send({ error: 'La estación tiene bicis asociadas y no puede ser eliminada.' });
      return;
    }

    let result = await collection.deleteOne(query);
    res.send(result).status(200);
    
  } catch (error) {
    res.send({error: error.message}).status(500);
  }
    
  });

/* PUT token and claims. */
router.put('/:id',  async function(req, res, next) {
  try {
    const db = await connectToDatabase();
    const query = { _id: new ObjectId(req.params.id) };
    let collection = await db.collection("estacion");
    let result = await collection.replaceOne(query, req.body);
    res.send(result).status(200);
  } catch (error) {
    res.send({error: error.message}).status(500);
  }
    
});

module.exports = router;

