import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Define el componente 'LoginForm'
function LoginForm() {
  // Estados para almacenar los valores de los campos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Función para navegar entre las páginas usando
  const navigate = useNavigate();

  // Función para manejar el inicio de sesión
  const iniciarSesion = () => {
    // Realiza una solicitud POST al servidor de autenticación
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    })
      .then(response => {
        // Extrae datos importantes de la respuesta
        const { message, token, datos } = response.data;

        // Manejo de diferentes casos según la respuesta del servidor
        if (response.status === 200 && message === "Inicio exitoso") {
          // Almacena el token en el almacenamiento local
          localStorage.setItem('token', token);
          const username = datos.username;
          // Muestra una notificación de éxito
          Swal.fire({
            title: "<strong> Inicio exitoso</strong>",
            html: `<i>El usuario <strong>${username}</strong> Inició sesión con éxito</i>`,
            icon: 'success',
            timer: 3000
          });
        } else if (response.status === 401) {
          // Muestra un mensaje de error en caso de credenciales incorrectas
          Swal.fire({
            title: "<strong> Credenciales incorrectas </strong>",
            icon: 'error',
            timer: 3000
          });
        } else if (response.status === 404) {
          // Muestra un mensaje de error si el usuario no se encuentra
          Swal.fire({
            title: "<strong> Usuario no encontrado </strong>",
            icon: 'error',
            timer: 3000
          });
        } else {
          // Muestra un mensaje de error genérico
          Swal.fire({
            title: "<strong> Error al iniciar sesión </strong>",
            icon: 'error',
            timer: 3000
          });
        }

        // Limpiar los campos del input en caso de error de inicio de sesión
        setEmail("");
        setPassword("");
      })
      .catch(error => {
         // Maneja errores de la solicitud, como problemas de red
        console.error(error);
        alert("Error al procesar la solicitud. Por favor, inténtalo de nuevo.");
      });
  };

// Función para redirigir a la página de registro
  const redirectToRegistro = () => {
    navigate('/registro'); 
  };
  // Renderiza el formulario de inicio de sesión
  return (
    <form className="form">
      <div className="title">Bienvenido<br /><span>Ingrese para continuar</span></div>
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="input"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="input"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button className="button-confirm" onClick={iniciarSesion}>Iniciar sesión</button>
      <button className="button-register" onClick={redirectToRegistro}>Registrar</button>
    </form>
  );
}

export default LoginForm;
