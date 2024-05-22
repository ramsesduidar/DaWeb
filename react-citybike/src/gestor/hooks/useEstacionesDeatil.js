import { useEffect, useState } from "react";
import { getEstacion } from "../../api/ApiEstaciones";

const useEstacionesDeatil = (id, refresh) => {
    const [estacion, setEstacion] = useState(null);

    useEffect(() => {
        const fetchEstacion = () => {
            getEstacion(id)
                .then(data => {setEstacion(data);})
                .catch(error => console.log("Error al recuperar la estacion: " + error.message))
        };

        fetchEstacion();
    }, [id, refresh]);

    return {estacion};
};

export default useEstacionesDeatil;