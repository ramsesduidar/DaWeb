import { useEffect, useState } from "react";
import { getAlquileresReservas } from "../../api/ApiBicis";

const useAlquileresReservas = (id, refresh, setError) => {
    const [info, setEstacion] = useState(null);
    const [loading1, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservasalquileres = () => {
            getAlquileresReservas(id)
                .then(data => {setEstacion(data);
                setLoading(false);})
                .catch(error => {console.log("Error al recuperar las reservas/alquileres: " + error.message); setError(error.message)})
        };

        fetchReservasalquileres();
    }, [id, refresh]);

    return {info, loading1};
};

export default useAlquileresReservas;