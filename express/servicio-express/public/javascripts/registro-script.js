window.onload = function() {
    console.log("login-script funcionando...")
    
    document.getElementById('boton-registro').addEventListener('click', registro);
}

async function registro(e){
    e.preventDefault();

    let formulario = document.forms["registro-form"];

    let idUser = formulario.idUser.value;
    let username = formulario.username.value;
    let git = formulario.git.value;
    let nombre = formulario.nombre.value;
    let apellido = formulario.apellido.value;
    let direccion = formulario.direccion.value;

    console.log("campos del formulario: " + formulario.username.value + " " + formulario.git.value);

    var request = new Request('http://localhost:3030/registro', {
        method: 'POST',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            'id': idUser, 'usuario':username,
            'oauth2': git, 'nombre':nombre,
            'apellidos': apellido, 'direccion':direccion
        })

    })

    var response = await fetch(request);
    console.log(response);
    if(response.ok){
        document.getElementById("error-login").style.display = "none";

        window.location.href = `http://localhost:3030/login`;        
    }
    else{
        document.getElementById("error-login").style.display = "block";
        // Selecciona el elemento por su id
        var errorElement = document.getElementById("error-login");
        // Cambia el contenido del elemento
        var msj = await response.text(); 
        errorElement.innerHTML = msj;
    }
        
}