import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';


function UserProfile() {
  const history = useHistory();
  const { username } = useParams(); // Obtener el parámetro 'username' de la URL
  useEffect(() => {
    let req = new Request(`http://localhost:3030/auth/${username}`, {
      method: 'GET',
      redirect: 'follow',
    })

    fetch(req)
      .then(response => {
        return response.json()
      })
      .then(data =>{
        let claims = data.claims;
        let token = data.token;
        console.log("Hemos iniciado sesion con el rol: " + claims.Roles + ", el usuario: " + claims.sub + " y el token: " + token)
        localStorage.setItem("token", token);
        localStorage.setItem("claims", JSON.stringify(claims));
        console.log("Userprofile: " + claims.Roles.toLowerCase())
        localStorage.setItem("rol", claims.Roles.toLowerCase());

        history.push('/');
      })
      .catch( error =>{
        window.location.href = 'http://localhost:3030/login';
      })

    
  }, []);
  
    return null;
}

export default UserProfile;
