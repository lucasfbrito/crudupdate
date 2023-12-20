import React, { useState } from 'react';
import Axios from "axios";
import './estilos/registro.css';
import {useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// Define el componente 'Registro'
function Registro() {
  // Utiliza el hook 'useState' para manejar el estado de los campos del formulario
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

// Función para manejar el registro de un nuevo usuario
  const register = () => {
    // Realiza una solicitud POST al servidor para registrar el usuario
    Axios.post("http://localhost:3001/register", {
      username: username,
      email: email,
      password: password,
    }).then(() => {
      // Al registrar con éxito, almacena el nombre de usuario en el almacenamiento local
      localStorage.setItem('username', username);
      // Muestra una notificación de exito al registrar
      Swal.fire({
        title: "<strong> Registro exitoso</strong>",
        html: "<i>El usuario <strong>" + [username] + "</strong> fue registrado con éxito</i>",
        icon: 'success',
        timer: 3000
      }
      )
       // Redirige al usuario a la página de inicio de sesión
      navigate(`/iniciar-sesion/`);
    });
    
  }
  
   // Renderiza el formulario de registro
  return (
    <form className="form">
    <div className="title">Bienvenido<br /><span>Registrese para continuar</span></div>
    <input
      type="text"
      placeholder="username"
      name="user"
      className="input"
      onChange={(event) => setUsername(event.target.value)}
    />
     <input
      type="email"
      placeholder="email"
      name="email"
      className="input"
      onChange={(event) => setEmail(event.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      name="password"
      className="input"
      onChange={(event) => setPassword(event.target.value)}
    />
    <button className="button-confirm" id="registerbtn" onClick={register}>registrar</button>
  </form>

  );
};



export default Registro;
          




