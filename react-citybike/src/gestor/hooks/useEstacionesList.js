import { useState, useEffect } from 'react';
import { getEstacionesPaginado } from '../../api/ApiEstaciones';

const useEstacionesList = (size, nombre, num, refresh) => {
  const [respuesta, setRespuesta] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchEstaciones = async (url = `http://localhost:8090/estaciones?page=0&size=${size}`) => {
    getEstacionesPaginado(url+`&nombre=${nombre}&numPuestos=${num}`)
      .then(data => {
        console.log(data);
        setRespuesta(data);
        setLoading(false);
      })
      .catch(error =>{
        console.log(error);
      })
  };

  useEffect(() => {
    fetchEstaciones();
  }, [size, nombre, num, refresh]);

  return { respuesta, loading, fetchEstaciones };
};

export default useEstacionesList;
