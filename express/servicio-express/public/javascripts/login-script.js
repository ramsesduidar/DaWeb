

if (localStorage.getItem("token") && localStorage.getItem("claims")) {
    enviarClaims(localStorage.getItem("token"), JSON.parse(localStorage.getItem("claims")))
    .then(response2 => {
        var user = localStorage.getItem("username");
        if (response2.status == 204){
            window.location.href = `http://localhost:3000/profile/${user}`;
        }
        else{
            console.log("Error inesperado al iniciar sesion, intentelo de nuevo");
        }
    })
}

window.onload = function() {
    console.log("login-script funcionando...")
    
    document.getElementById('boton-login-github').addEventListener('click', loginOauth2);
    document.getElementById('boton-login-normal').addEventListener('click', loginNormal);
}

async function loginNormal(e){
    e.preventDefault();

    let formulario = document.forms["login-form"];

    let username = formulario.username.value;
    let password = formulario.password.value;

    console.log("campos del formulario: " + formulario.username.value + " " + formulario.password.value);

    var request = new Request('http://localhost:8090/auth/login', {
        method: 'POST',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({'username': username, 'password':password })

    })

    var response = await fetch(request);
    console.log(response);
    if(response.status == 200){
        document.getElementById("error-login").style.display = "none";

        let data = await response.json();
        console.log(data)
        
        let claims = data.claims;
        let token = data.token;
        console.log("Hemos iniciado sesion con el rol: " + claims.Roles + " y el token: " + token)
        localStorage.setItem("token", token);
        localStorage.setItem("claims", JSON.stringify(claims));
        localStorage.setItem("username", claims.sub);

        enviarClaims(token, claims)
        .then(response2 => {
            var user = localStorage.getItem("username");
            if (response2.status == 204){
                window.location.href = `http://localhost:3000/profile/${user}`;
                window.location.reload();
            }
            else{
                console.log("Error inesperado al iniciar sesion, intentelo de nuevo");
            }
        })
    }
    else{

        document.getElementById("error-login").style.display = "block";

        

    }
        
}

function loginOauth2(e){
    e.preventDefault();
    
    console.log("Boton oauth2 pulsado");

    window.location.href = 'http://localhost:8090/auth/oauth2';
}

function procesarTokenDesdeUrl(){
    console.log("Token recibido: ");
}

function enviarClaims(token, claims){

    let req1 = new Request(`http://localhost:3030/auth/${claims.sub}`, {
        method: 'POST',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({'token': token, 'claims':claims })

    })

    return fetch(req1)
}