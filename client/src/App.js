import React from 'react'
import { Link } from 'react-router-dom';
import "./estilos/App.css"
function App() {
  return (
    
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <Link to="/App"><a className="navbar-brand" href="#">Gestor</a></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
      <Link to="/empleados"><a className="nav-link active" aria-current="page" href="#">Empleados</a></Link>
      <Link to="/clientes"><a className="nav-link" href="#">Clientes</a></Link>
      <Link to="/"><a className="nav-link disabled" aria-disabled="true">Cerrar sesion</a></Link>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default App