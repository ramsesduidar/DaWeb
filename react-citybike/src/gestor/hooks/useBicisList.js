import { useState, useEffect } from 'react';
import { getBicisPaginado } from '../../api/ApiBicis';

const useBicisList = (size, refresh, idEstacion) => {
  const [respuesta, setRespuesta] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchBicis = async (url = `http://localhost:8090/estaciones/${idEstacion}/bicis?page=0&size=${size}`) => {
    getBicisPaginado(url)
      .then( data => {
        setRespuesta(data);
        setLoading(false);
      })
      .catch( error =>{
        console.log(error);
      })
  };

  useEffect(() => {
    fetchBicis();
  }, [size, refresh, idEstacion]);

  return { respuesta, loading, fetchBicis };
};

export default useBicisList;
