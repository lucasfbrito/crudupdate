import React from 'react'
import './estilos/clientes.css'
import{useState} from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';


// Funcion principal del componente
function Clientes() {
  // Definicion de estados para los campos del formulario
  const[nombre,setnombre]=useState("");
  const[edad,setedad]=useState();
  const[pais,setpais]=useState("");
  const[direccion,setdireccion]=useState("");
  const[idcliente,setidcliente]=useState();
  const[editar,seteditar]=useState(false);

// Estado para almacenar la lista de clientes
    const [clientesList,setClientes]= useState([]);
// Obtiene el token almacenado en el localStorage
    const token = localStorage.getItem('token');

    // Función para agregar un nuevo cliente
    const add = () => {
        // Verificar si los campos obligatorios están completos
        if (!nombre || !edad || !pais || !direccion) {
         // Mostrar mensaje de error o manejar la falta de campos obligatorios
         // Por ejemplo:
         alert('Por favor, complete todos los campos obligatorios.');
         return;
       }

    // Validar el formato de la edad (asegurarse de que sea un número)
    const parsedAge = parseInt(edad);
        if (isNaN(parsedAge) || parsedAge <= 0) {
    // Mostrar mensaje de error o manejar el formato incorrecto de la edad
    // Por ejemplo:
         alert('Por favor, ingrese una edad válida.');
         return
    };

     // Realiza la solicitud para agregar un nuevo empleado
    Axios.post("http://localhost:3001/createcliente", {
    nombre: nombre,
    edad: edad,
    pais: pais,
    direccion: direccion,
  },  { 
    headers: {
      'Authorization': `Bearer ${token}` 
    }
}).then(() => {
    getClientes();
    limpiarCampos();
  // Muestra un mensaje al registrar correctamente un empleado
    Swal.fire({
      title: "<strong> Registro exitoso</strong>",
      html: "<i>El cliente <strong>" + [nombre] + "</strong> fue registrado con éxito</i>",
      icon: 'success',
      timer: 3000
    });
  });
};


// Función para actualizar un cliente
const update = ()=>{
    // Verificar si los campos obligatorios están completos
 if (!nombre || !edad || !pais || !direccion) {
   // Mostrar mensaje de error o manejar la falta de campos obligatorios
   // Por ejemplo:
   alert('Por favor, complete todos los campos obligatorios.');
   return;
 }

 // Validar el formato de la edad (asegurarse de que sea un número)
 const parsedAge = parseInt(edad);
 if (isNaN(parsedAge) || parsedAge <= 0) {
   // Mostrar mensaje de error o manejar el formato incorrecto de la edad
   // Por ejemplo:
   alert('Por favor, ingrese una edad válida.');
   return;
 }

 // Realiza la solicitud para actualizar un empleado
   Axios.put("http://localhost:3001/updatecliente",{
   idcliente: idcliente,  
   nombre: nombre,
   edad: edad,
   pais: pais,
   direccion: direccion,
   },{ 
     headers: {
       'Authorization': `Bearer ${token}` 
     }
 }
   ).then(()=>{
     getClientes();
     limpiarCampos();
     // Muestra un mensaje al actualizar correctamente un empleado
     Swal.fire({
       title: "<strong> Actualizacion exitosa!!</strong>",
       html:`<i>El cliente <strong>${nombre}</strong> fue actualizado con éxito!!</i>`,
       icon: 'success',
       timer:3000
     })
   });
 };


    // Función para eliminar un cliente
  const deleteclient = (val) => {
    // Muestra un cuadro de confirmacion para borrar
    Swal.fire({
      title: 'Confirmar eliminado?',
      html: "<i>Realmente desea eliminar a <strong>" + val.nombre + "</strong>?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        // Realiza la solicitud para eliminar
        Axios.delete(`http://localhost:3001/deletecliente/${val.idcliente}`, {
            
            headers: {
              'Authorization': `Bearer ${token}` // Agrega el encabezado 'Authorization'
            }
          }
        ).then(() => {
          getClientes();
          limpiarCampos();
           // Muestra un cuadro de exito al eliminar
          Swal.fire({
            title: 'Eliminado!',
             html:  "<strong>" +  val.nombre +  "</strong>" + " fue eliminado.",
             icon:'success',
              timer:3000
           });
        })
       }  ;
      
    });
  };

  // Función para limpiar los campos del formulario
  const limpiarCampos = ()=>{
    setnombre("");
    setedad("");
    setpais("");
    setdireccion("");
    setidcliente("");
    seteditar(false);
  }
 // Función para obtener la lista de clientes
 const getClientes =()=>{
    Axios.get("http://localhost:3001/clientes"
   ).then((response)=>{
  setClientes(response.data);
    });
  };

    // Función para activar el modo de edición de un empleado
const editarCliente = (val)=>{
    seteditar(true);
    setnombre(val.nombre);
    setedad(val.edad);
    setpais(val.pais);
    setdireccion(val.direccion);
    setidcliente(val.id);
    }


return (
    <div>
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <Link to="/App"><a className="navbar-brand" href="#">Empleados</a></Link>
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
    <div className="container">
          <div className="card text-center">
        <div className="card-header">
          Gestion de clientes
        </div>
        <div className="card-body">
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Nombre:</span>
        <input type="text" 
        onChange={(event)=>{setnombre(event.target.value);
        }
        }
        className="form-control" value={nombre}     placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
     </div>
    
      <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Edad: </span>
  <input type="text" 
  onChange={(event)=>{setedad(event.target.value);
  }
  }
  className="form-control" value={edad}    placeholder="Ingrese una edad" aria-label="Username" aria-describedby="basic-addon1"/>
</div>


<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Pais</span>
  <input type="text" 
  onChange={(event)=>{setpais(event.target.value);
  }
  }
  className="form-control" value={pais}   placeholder="Ingrese el pais" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Direccion cliente</span>
  <input type="text" 
  onChange={(event)=>{setdireccion(event.target.value);
  }
  }
  className="form-control" value={direccion} placeholder="Ingrese direccion" aria-label="Username" aria-describedby="basic-addon1"/>
</div>    
        </div>
        <div className="card-footer text-muted">
          {
            editar?
            <div>
            <button className='btn btn-warning'  id='btn'  onClick={update}>Actualizar</button> 
            <button className='btn btn-info'  id='btn'  onClick={limpiarCampos}>Cancelar</button>
            </div>
                 :
                 <button className='btn btn-success'  id='btn'  onClick={add}>Registrar</button>

          }
        <button className='btn btn-success'  id='btn'  onClick={getClientes}>Mostrar registros</button>
        </div>
      </div>

      <table className="table table-striped">
      <thead>
    <tr>
      <th scope="col">Idcliente</th>
      <th scope="col">Nombre</th>
      <th scope="col">Edad</th>
      <th scope="col">Pais</th>
      <th scope="col">Direccion</th>
    </tr>
  </thead>
  <tbody>{
  clientesList.map((val,key)=>{
    return <tr key={val.idcliente}>
      <th >{val.idcliente}</th>
      <td>{val.nombre}</td>
      <td>{val.edad}</td>
      <td>{val.pais}</td>
      <td>{val.direccion}</td>
      <td>
      <div className="btn-group" role="group" aria-label="Basic example">
      <button type="button" 
      onClick={()=>{
        editarCliente(val);
         } 
      }
      className="btn btn-info">Editar</button>
      <button type="button"
      onClick={()=>{
        deleteclient(val);
      }}
      
      className="btn btn-danger">Eliminar</button>
      
</div>
        </td> 

    </tr>
  
  })
}

  </tbody>
</table>

    </div>
    </div>
  )
  };





export default Clientes;