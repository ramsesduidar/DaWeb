import React from 'react';

function Logout() {
  const handleLogout = () => {
    // Eliminar todos los datos del localStorage
    localStorage.clear();

    // Redirigir a la página de logout (por ejemplo, localhost:3030/logout)
    window.location.href = 'http://localhost:3030/logout';
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
