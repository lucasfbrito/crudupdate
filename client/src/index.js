import React from 'react';
import ReactDOM from 'react-dom/client';
import Inicio from './Inicio';

// Crea una raíz de ReactDOM utilizando createRoot y asigna la raíz al elemento con id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
// Renderiza el componente 'Inicio' dentro de React.StrictMode en la raíz creada
root.render(
  
  <React.StrictMode>
    <Inicio />   
  </React.StrictMode>
);
 