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

export async function alquilar(idUsuario, idBici) {
    const token = getToken();
    if (!token) {
        throw new Error('Token no encontrado en localStorage');
    }


    let req = new Request(`http://localhost:8090/alquileres/usuarios/${idUsuario}/alquileres`, {
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

export async function reservar(idUsuario, idBici) {
    const token = getToken();
    if (!token) {
        throw new Error('Token no encontrado en localStorage');
    }


    let req = new Request(`http://localhost:8090/alquileres/usuarios/${idUsuario}/reservas`, {
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
            console.log("respuesta reservar bici: " + response.ok)

            if (!response.ok){
                throw new Error("Error inesperado al reservar la bici, intentelo de nuevo");
            }

            return response.status;
        })
        .catch(error => {
            console.log(error);
            throw new Error(error.message)
        })
}


export async function getAlquileresReservas(usuarioId) {
    const token = getToken();
    if (!token) {
        throw new Error('Token no encontrado en localStorage');
    }

    const url = `http://localhost:8090/alquileres/usuarios/${usuarioId}`;
    let req = new Request(url, {
        method: 'GET',
        redirect: 'follow',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        })
    });

    try {
        const response = await fetch(req);
        if (!response.ok) {
            throw new Error(`Error al obtener datos del usuario: ${response.statusText}`);
        }

        const data = await response.json();
        const now = new Date();

        const activeAlquiler = data.alquileres.find(alquiler => !alquiler.fin);

        const otherAlquileres = data.alquileres.filter(alquiler => alquiler.fin);

        const activeReserva = data.reservas.find(reserva => {
            console.log(now);
            const caducidad = new Date(reserva.caducidad);
            console.log(caducidad);
            var hora = caducidad.getHours()+2;
            caducidad.setHours(hora);
            console.log(caducidad);
            return caducidad > now;
        });

        const otherReservas = data.reservas.filter(reserva => {
            const caducidad = new Date(reserva.caducidad);
            var hora = caducidad.getHours()+2;
            caducidad.setHours(hora);
            return caducidad <= now;
        });

        if (activeAlquiler) {
            return {
                activeAlquiler: activeAlquiler,
                activeReserva: null,
                otherAlquiler: otherAlquileres || [],
                otherReserva: data.reservas || []
            };
        } else if (activeReserva) {
            return {
                activeAlquiler: null,
                activeReserva: activeReserva,
                otherAlquiler: data.alquileres || [],
                otherReserva: otherReservas || []
            };
        } else {
            return {
                activeAlquiler: null,
                activeReserva: null,
                otherAlquiler: data.alquileres || [],
                otherReserva: data.reservas || []
            };
        }

    } catch (error) {
        console.error("Error:", error.message);
        throw new Error(error.message);
    }
}

export async function confirmarReserva(idUsuario) {
    const token = getToken();
    if (!token) {
        throw new Error('Token no encontrado en localStorage');
    }


    let req = new Request(`http://localhost:8090/alquileres/usuarios/${idUsuario}/reservas`, {
        method: 'PATCH',
        redirect: 'follow',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded"
        })
    })

    return fetch(req)
        .then(response => {
            console.log("respuesta confirmarReserva bici: " + response.ok)

            if (!response.ok){
                throw new Error("Error inesperado al confirmarReserva la bici, intentelo de nuevo");
            }

            return response.status;
        })
        .catch(error => {
            console.log(error);
            throw new Error(error.message)
        })
}

export async function dejarBici(idUsuario, idEstacion) {
    const token = getToken();
    if (!token) {
        throw new Error('Token no encontrado en localStorage');
    }


    let req = new Request(`http://localhost:8090/alquileres/usuarios/${idUsuario}/alquileres`, {
        method: 'PATCH',
        redirect: 'follow',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded"
        }),
        body: "idEstacion="+idEstacion
    })

    return fetch(req)
        .then(response => {
            console.log("respuesta dejarBici bici: " + response.ok)

            if (!response.ok){
                throw new Error("Error inesperado al dejarBici la bici, intentelo de nuevo");
            }

            return response.status;
        })
        .catch(error => {
            console.log(error);
            throw new Error(error.message)
        })
}

