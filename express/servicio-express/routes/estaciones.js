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
    let collection = await db.collection("estacion");

    const id = new ObjectId(req.params.id);
    const { nombre, numPuestos, direccion, latitud, longitud } = req.body;

    // Obtener el documento actual
    const estacionActual = await collection.findOne({ _id: id });

    if (!estacionActual) {
      return res.status(404).send({ error: 'Estación no encontrada' });
    }

    // Crear el documento actualizado
    const updatedEstacion = {
      nombre: nombre || estacionActual.nombre,
      numPuestos: Math.max(numPuestos, estacionActual.numPuestos),
      direccion: direccion || estacionActual.direccion,
      coordenadas: {
        x: latitud || estacionActual.coordenadas.x,
        y: longitud || estacionActual.coordenadas.y
      }
     
    };

    // Actualizar el documento en la base de datos
    const result = await collection.updateOne(
      { _id: id },
      { $set: {...updatedEstacion} }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).send({ error: 'No se pudo actualizar la estación' });
    }

    res.send({ message: 'Estación actualizada con éxito' }).status(200);
  } catch (error) {
    res.send({ error: error.message }).status(500);
  }
    
});

module.exports = router;

