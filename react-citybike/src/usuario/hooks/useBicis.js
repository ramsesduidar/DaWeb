import { useEffect, useState } from "react";
import { getAlquileresReservas } from "../../api/ApiBicis";

const useBicis = (id, refresh, setError) => {
    const [info, setEstacion] = useState(null);

    useEffect(() => {
        const fetchReservasalquileres = () => {
            getAlquileresReservas(id)
                .then(data => {setEstacion(data);})
                .catch(error => {console.log("Error al recuperar las reservas/alquileres: " + error.message); setError(error.message)})
        };

        fetchReservasalquileres();
    }, [id, refresh]);

    return {info};
};

export default useBicis;