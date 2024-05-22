
export async function getEstacion(id){
    try {
        const response = await fetch(`http://localhost:8090/estaciones/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener datos');
        }
        return response.json();
    } catch (error) {
        throw new Error(error.message);
    }

}

export async function getEstacionesPaginado(url){
    try {
        const token = getToken();
  
        const headers = {
          Authorization: `Bearer ${token}`,
        };
  
        url = url.replace('/?', '?');
        url = url.replace('//estaciones:', '//localhost:');
        url = url.replace(':8081', ':8090');
  
        const response = await fetch(url, { headers });
        if (!response.ok) {
          throw new Error('Error al obtener el listado de estaciones');
        }
  
        const data = await response.json();
        
        const estaciones = data._embedded?.estacionDTOList || [];
        const page = data.page;
        const links = data._links;
        
        return {estaciones, page, links}
  
      } catch (error) {
        throw new Error(error.message);
      }
}

export async function modificarEstacion(id, nuevosDatos){

    const token = getToken();
    if (!token) {
        throw new Error('Error al obtener el listado de estaciones');
    }


    let req = new Request(`http://localhost:3030/estaciones/${id}`, {
        method: 'PUT',
        redirect: 'follow',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(nuevosDatos)
    })

    return fetch(req)
        .then(response => {
            if (!response.ok){
                throw new Error("Error al modificar la estación, compruebe los campos");
            }
            return response.status;
        })
        .catch( error => {
            throw new Error(error.message);
        })

}

export async function removeEstacion(id){
    const token = getToken();
    if (!token) {
        throw new Error('Token no encontrado en localStorage');
    }


    let req = new Request(`http://localhost:3030/estaciones/${id}`, {
        method: 'DELETE',
        redirect: 'follow',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
        }),
    })
 
    return fetch(req)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            else{
                throw new Error("Error al eliminar la estación, compruebe que esté vacía");
            }
        })
        .then(data => {
            console.log(data);
            return data.deletedCount || 0;
        })
        .catch(error => {
            console.log(error);
            throw new Error(error.message)
        })
}

export async function crearEstacion(nuevaEstacion){
    const token = getToken();
    if (!token) {
        throw new Error('Token no encontrado en localStorage');
    }


    let req = new Request(`http://localhost:8090/estaciones`, {
        method: 'POST',
        redirect: 'follow',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(nuevaEstacion)
    })

    return fetch(req)
        .then(response => {
            if (!response.ok){
                throw new Error("Error inesperado al crear la estación, intentelo de nuevo");
            }
            return response.status;
        })
        .catch( error => {
            console.log(error);
            throw new Error(error.message);
        })
}

export function getToken(){
    return localStorage.getItem('token');
    
}