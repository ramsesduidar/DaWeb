import React from 'react';
import './Logout.css'

function Logout() {
  const handleLogout = () => {
    // Eliminar todos los datos del localStorage
    localStorage.clear();

    // Redirigir a la página de logout (por ejemplo, localhost:3030/logout)
    window.location.href = 'http://localhost:3030/logout';
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
