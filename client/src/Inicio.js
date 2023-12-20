import React from 'react';
import Main from './Main';
import IniciarSesion  from './iniciar-sesion';
import Registro from './registro';
import App from './App';
import Empleados  from './empleados'
import Clientes from './clientes';
import Ventas from './Ventas';
import { BrowserRouter,Route,Routes} from 'react-router-dom';


// Define el componente 'Inicio'

function Inicio() {
  return (
    <div className="Inicio">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={< Main />} />

          <Route path='/iniciar-sesion' element={<IniciarSesion />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/empleados' element={<Empleados />} />
          <Route path='/clientes' element={<Clientes />} />
          <Route path='/app' element={<App />} />
          <Route path='/ventas' element={<Ventas />} />
         
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default Inicio;