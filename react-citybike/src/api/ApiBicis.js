import { getToken } from "./ApiEstaciones";

export async function getBicisPaginado(url){
    try {
        const token = getToken();
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

        const bicis = data._embedded?.biciDTOList || [];
        const page = data.page;
        const links = data._links;
        
        return {bicis, page, links}
  
      } catch (error) {
        console.error('Error al obtener datos:', error);
        throw new Error(error.message);
      }
}

export async function addBiciToEstacion(idEstacion, nuevaBici){
    const token = getToken();
    if (!token) {
      throw new Error('Token no encontrado en localStorage');
    }


    let req = new Request(`http://localhost:8090/bicis`, {
        method: 'POST',
        redirect: 'follow',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(nuevaBici)
    })

    return fetch(req)
    .then(response => {
        console.log("respuesta add bici: " + response.ok)
        if (!response.ok){
            throw new Error("Error inesperado al crear la bici, intentelo de nuevo");
        }
        return response.status;
    })
    .catch(error => {
      console.log(error);
      throw new Error(error.message)
  })
}


export async function darBajaBici(idBici, motivo){
    const token = getToken();
    if (!token) {
        throw new Error('Token no encontrado en localStorage');
    }


    let req = new Request(`http://localhost:8090/bicis/${idBici}`, {
        method: 'PATCH',
        redirect: 'follow',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(motivo)
    })

    return fetch(req)
        .then(response => {
            console.log("respuesta dar baja bici: " + response.ok)

            if (!response.ok){
                throw new Error("Error inesperado al dar de baja la bici, intentelo de nuevo");
            }

            return response.status;
        })
        .catch(error => {
            console.log(error);
            throw new Error(error.message)
        })
}

export async function checkActive(usuarioId) {
    const token = getToken();
    if (!token) {
        throw new Error('Token no encontrado en localStorage');
    }

    let req = new Request(`http://localhost:8090/alquileres/usuarios/${usuarioId}`, {
        method: 'GET',
        redirect: 'follow',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        })
    });

    return fetch(req)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener datos del usuario");
            }
            return response.json();
        })
        .then(data => {
            const now = new Date();
            const hasActiveRental = data.alquileres.some(alquiler => !alquiler.fin);

            const hasActiveReservation = data.reservas.some(reserva => {
                const caducidad = new Date(reserva.caducidad);
                return caducidad > now;
            });

            return hasActiveRental || hasActiveReservation;
        })
        .catch(error => {
            console.error(error);
            throw new Error(error.message);
        });
}

export async function alquilar(idUsuario, idBici) {
    const token = getToken();
    if (!token) {
        throw new Error('Token no encontrado en localStorage');
    }


    let req = new Request(`http://localhost:8090/alquileres/usuarios/${idUsuario}`, {
        method: 'POST',
        redirect: 'follow',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded"
        }),
        body: "idBici="+idBici
    })

    return fetch(req)
        .then(response => {
            console.log("respuesta alquilar bici: " + response.ok)

            if (!response.ok){
                throw new Error("Error inesperado al alquilar la bici, intentelo de nuevo");
            }

            return response.status;
        })
        .catch(error => {
            console.log(error);
            throw new Error(error.message)
        })
}

