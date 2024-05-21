import { useEffect, useState } from "react";

const useEstacionesDeatil = (id, refresh) => {
    const [estacion, setEstacion] = useState(null);

    useEffect(() => {
        const fetchEstacion = async () => {
        try {
            const response = await fetch(`http://localhost:8090/estaciones/${id}`);
            if (!response.ok) {
            throw new Error('Error al obtener datos');
            }
            const data = await response.json();
            setEstacion(data);
        } catch (error) {
            console.error('Error al obtener datos de la estación:', error);
        }
        };

        fetchEstacion();
    }, [id, refresh]);

    return {estacion};
};

export default useEstacionesDeatil;