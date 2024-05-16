import './App.css';
import { useEffect, useState } from 'react';
import UsuarioApp from './usuario/UsuarioApp';
import GestorApp from './gestor/GestorApp';


function App() {
  const [role, setRole] = useState(null);
  useEffect(() => {
    
    let rol = localStorage.getItem("rol");
    setRole(rol);

    if (!['usuario', 'gestor'].includes(rol)) {
      setTimeout(() => {
        window.location.href = 'http://localhost:3030/login';
      }, 1000);
    }
    
  }, []);

  if (role === 'usuario') {
    return <UsuarioApp />;
  } else if (role === 'gestor') {
    return <GestorApp />;
  } else {
    return (
      <div>
        <h1>Error: Rol no válido</h1>
        <p>Serás redirigido al inicio de sesión en breve...</p>
      </div>
    );
  }
}

export default App;
