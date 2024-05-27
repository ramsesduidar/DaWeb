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

async function checkActive(usuarioId) {
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
            // Check if the user has any active rentals or reservations
            const hasActiveRentOrReserve = data.alquileres.length > 0 || data.reservas.length > 0;
            return hasActiveRentOrReserve;
        })
        .catch(error => {
            console.error(error);
            throw new Error(error.message);
        });
}

export async function alquilarBici(usuarioId, idBici) {

  try {

    const hasActiveRentOrReserve = await checkActive(usuarioId);
        if (hasActiveRentOrReserve) {
            throw new Error("El usuario ya tiene una reserva o alquiler activo");
        }

  const token = getToken();
  if (!token) {
      throw new Error('Token no encontrado en localStorage');
  }

  const alquiler = {
      idBicicleta: idBici,
      inicio: new Date().toISOString(),
      fin: null
  };

  const rentData = {
      id: usuarioId,
      reservas: [],
      alquileres: [alquiler]
  };

  let req = new Request(`http://localhost:8090/alquileres/usuarios/${usuarioId}`, {
      method: 'POST',
      redirect: 'follow',
      headers: new Headers({
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
      }),
      body: JSON.stringify(rentData)
  });

  return fetch(req)
      .then(response => {
          console.log("respuesta rent bici: " + response.ok);

          if (!response.ok) {
              throw new Error("Error inesperado al alquilar la bici, intentelo de nuevo");
          }

          return response.status;
      })
      .catch(error => {
          console.log(error);
          throw new Error(error.message);
      });
    } catch(error) {
        console.error(error.message);
        throw error;
    }
}

export async function reservarBici(usuarioId, idBici) {

try {

    const hasActiveRentOrReserve = await checkActive(usuarioId);
    if (hasActiveRentOrReserve) {
        throw new Error("El usuario ya tiene una reserva o alquiler activo");
    }
  const token = getToken();
  if (!token) {
      throw new Error('Token no encontrado en localStorage');
  }

  const ahora = new Date();
  const caducidad = new Date(ahora.getTime() + 30 * 60000); // 30 minutos

  const reserva = {
      idBicicleta: idBici,
      creada: ahora.toISOString(),
      caducidad: caducidad.toISOString()
  };

  const reservaData = {
      id: usuarioId,
      reservas: [reserva],
      alquileres: []
  };

  let req = new Request(`http://localhost:8090/alquileres/usuarios/${usuarioId}`, {
      method: 'POST',
      redirect: 'follow',
      headers: new Headers({
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
      }),
      body: JSON.stringify(reservaData)
  });

  return fetch(req)
      .then(response => {
          console.log("respuesta reserve bici: " + response.ok);

          if (!response.ok) {
              throw new Error("Error inesperado al reservar la bici, intentelo de nuevo");
          }

          return response.status;
      })
      .catch(error => {
          console.log(error);
          throw new Error(error.message);
      });
    } catch(error) {
        console.error(error.message);
        throw error;
    }
}

export async function confirmarReserva(usuarioId, idBici) {
  const token = getToken();
  if (!token) {
      throw new Error('Token no encontrado en localStorage');
  }

  const ahora = new Date();
  const alquiler = {
      idBicicleta: idBici,
      inicio: ahora.toISOString(),
      fin: null
  };

  const confirmData = {
      id: usuarioId,
      reservas: [],
      alquileres: [alquiler]
  };

  let req = new Request(`http://localhost:8090/alquileres/usuarios/${usuarioId}`, {
      method: 'POST',
      redirect: 'follow',
      headers: new Headers({
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
      }),
      body: JSON.stringify(confirmData)
  });

  return fetch(req)
      .then(response => {
          console.log("respuesta confirmar reserva: " + response.ok);

          if (!response.ok) {
              throw new Error("Error inesperado al confirmar la reserva, intentelo de nuevo");
          }

          return response.status;
      })
      .catch(error => {
          console.log(error);
          throw new Error(error.message);
      });
}

export async function endAlquiler(usuarioId, idBici) {
  const token = getToken();
  if (!token) {
      throw new Error('Token no encontrado en localStorage');
  }

  const ahora = new Date().toISOString();

  const endData = {
      id: usuarioId,
      reservas: [],
      alquileres: [
          {
              idBicicleta: idBici,
              inicio: null,
              fin: ahora
          }
      ]
  };

  let req = new Request(`http://localhost:8090/alquileres/usuarios/${usuarioId}`, {
      method: 'PATCH',
      redirect: 'follow',
      headers: new Headers({
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
      }),
      body: JSON.stringify(endData)
  });

  return fetch(req)
      .then(response => {
          console.log("respuesta terminar alquiler: " + response.ok);

          if (!response.ok) {
              throw new Error("Error inesperado al terminar el alquiler, intentelo de nuevo");
          }

          return response.status;
      })
      .catch(error => {
          console.log(error);
          throw new Error(error.message);
      });
}