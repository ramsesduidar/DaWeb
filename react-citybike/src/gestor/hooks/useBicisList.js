import { useState, useEffect } from 'react';

const useBicisList = (size, refresh, idEstacion) => {
  const [respuesta, setRespuesta] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBicis = async (url = `http://localhost:8090/estaciones/${idEstacion}/bicis?page=0&size=${size}`) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado en localStorage');
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      url = url.replace('/?', '?');
      url = url.replace('//estaciones:', '//localhost:');
      url = url.replace(':8081', ':8090');

      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error('Error al obtener datos');
      }

      const data = await response.json();

      
      setRespuesta(data);
      setLoading(false);
      

    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    fetchBicis();
  }, [size, refresh, idEstacion]);

  return { respuesta, loading, fetchBicis };
};

export default useBicisList;
