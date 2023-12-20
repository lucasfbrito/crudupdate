import './estilos/App.css';
import React, { useState} from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

function Empleados() {
 // Definicion de estados para los campos del formulario
 const[nombre,setnombre]=useState("");
 const[edad,setedad]=useState();
 const[pais,setpais]=useState("");
 const[cargo,setcargo]=useState("");
 const[anios,setanios]=useState();
 const[editar,seteditar]=useState(false);
 const[id,setid]=useState();

// Estado para almacenar la lista de empleados
const [empleadosList,setEmpleados]= useState([]);
// Obtiene el token almacenado en el localStorage
const token = localStorage.getItem('token');
// Función para agregar un nuevo empleado
const add = () => {
  // Verificar si los campos obligatorios están completos
  if (!nombre || !edad || !pais || !cargo || !anios) {
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

 // Validar el formato de 'anios' (asegurarse de que sea un número)
 const parsedAnios = parseInt(anios);
 if (isNaN(parsedAnios) || parsedAnios <= 0) {
   // Mostrar mensaje de error o manejar el formato incorrecto de 'anios'
   // Por ejemplo:
   alert('Por favor, ingrese una cantidad válida de años.');
   return;
 }
  // Realiza la solicitud para agregar un nuevo empleado
 Axios.post("http://localhost:3001/createempleados", {
   nombre: nombre,
   edad: edad,
   pais: pais,
   cargo: cargo,
   anios: anios,
 },  { 
   headers: {
     'Authorization': `Bearer ${token}` 
   }
}
 ).then(() => {
   getEmpleados();
   limpiarCampos();
 // Muestra un mensaje al registrar correctamente un empleado
   Swal.fire({
     title: "<strong> Registro exitoso</strong>",
     html: "<i>El empleado <strong>" + [nombre] + "</strong> fue registrado con éxito</i>",
     icon: 'success',
     timer: 3000
   });
 });
};

 // Función para actualizar un empleado
 const update = ()=>{
    // Verificar si los campos obligatorios están completos
 if (!nombre || !edad || !pais || !cargo || !anios) {
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

 // Validar el formato de 'anios' (asegurarse de que sea un número)
 const parsedAnios = parseInt(anios);
 if (isNaN(parsedAnios) || parsedAnios <= 0) {
   // Mostrar mensaje de error o manejar el formato incorrecto de 'anios'
   // Por ejemplo:
   alert('Por favor, ingrese una cantidad válida de años.');
   return;
 }
 // Realiza la solicitud para actualizar un empleado
   Axios.put("http://localhost:3001/updatempleados",{
   id:id,  
   nombre:nombre,
     edad:edad,
     pais:pais,
     cargo:cargo,
     anios:anios
   },{ 
     headers: {
       'Authorization': `Bearer ${token}` 
     }
 }
   ).then(()=>{
     getEmpleados();
     limpiarCampos();
     // Muestra un mensaje al actualizar correctamente un empleado
     Swal.fire({
       title: "<strong> Actualizacion exitosa!!</strong>",
       html:`<i>El empleado <strong>${nombre}</strong> fue actualizado con éxito!!</i>`,
       icon: 'success',
       timer:3000
     })
   });

 }
 
 // Función para eliminar un empleado
 const deleteEmple = (val) => {
   // Muestra un cuadro de confirmacion para borrar empleado
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

       // Realiza la solicitud para eliminar un empleado
       Axios.delete(`http://localhost:3001/deleteempleado/${val.id}`, {
           
           headers: {
             'Authorization': `Bearer ${token}` // Agrega el encabezado 'Authorization'
           }
         }
       ).then(() => {
         getEmpleados();
         limpiarCampos();
          // Muestra un cuadro de exito al eliminar un empleado
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
   setanios("");
   setnombre("");
   setcargo("");
   setedad("");
   setpais("");
   setid("");
seteditar(false);
 }


// Función para obtener la lista de empleados
 const getEmpleados =()=>{
   Axios.get("http://localhost:3001/empleados"
  ).then((response)=>{
 setEmpleados(response.data);
   });

 }


 // Función para activar el modo de edición de un empleado
const editarEmpleado = (val)=>{
seteditar(true);
setnombre(val.nombre);
setedad(val.edad);
setcargo(val.cargo);
setpais(val.pais);
setanios(val.anios);
setid(val.id);
}

 return (
    <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <Link to="/app"><a className="navbar-brand" href="#">Gestor</a></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
      <Link to="/empleados"><a className="nav-link active" aria-current="page" href="#">Empleados</a></Link>
      <Link to="/clientes"><a className="nav-link" href="#">Clientes</a></Link>
      <Link to="/Ventas">  <a className="nav-link" href="#">Ventas</a></Link>
      <Link to="/"><a className="nav-link disabled" aria-disabled="true">Cerrar sesion</a></Link>
      </div>
    </div>
  </div>
</nav>

   <div className="container">
         <div className="card text-center">
       <div className="card-header">
         Gestion de empleados
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
 <span className="input-group-text" id="basic-addon1">Edad</span>
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
 className="form-control"  value={pais}   placeholder="Ingrese un Pais " aria-label="Username" aria-describedby="basic-addon1"/>
</div>

<div className="input-group mb-3">
 <span className="input-group-text" id="basic-addon1">Cargo</span>
 <input type="text" 
 onChange={(event)=>{setcargo(event.target.value);
 }
 }
 className="form-control" value={cargo}   placeholder="Ingrese un Cargo " aria-label="Username" aria-describedby="basic-addon1"/>
</div>

<div className="input-group mb-3">
 <span className="input-group-text" id="basic-addon1">Años en la empresa</span>
 <input type="text" 
 onChange={(event)=>{setanios(event.target.value);
 }
 }
 className="form-control" value={anios} placeholder="Ingrese la cantidad de años " aria-label="Username" aria-describedby="basic-addon1"/>
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
       <button className='btn btn-success'  id='btn'  onClick={getEmpleados}>Mostrar registros</button>
       </div>
     </div>

     <table className="table table-striped">
     <thead>
   <tr>
     <th scope="col">Id</th>
     <th scope="col">Nombre</th>
     <th scope="col">Edad</th>
     <th scope="col">Pais</th>
     <th scope="col">Cargo</th>
     <th scope="col">Experiencia</th>
     <th scope="col">Acciones</th>
   </tr>
 </thead>
 <tbody>{
 empleadosList.map((val,key)=>{
   return <tr key={val.id}>
     <th >{val.id}</th>
     <td>{val.nombre}</td>
     <td>{val.edad}</td>
     <td>{val.pais}</td>
     <td>{val.cargo}</td>
     <td>{val.anios}</td> 
     <td>
     <div className="btn-group" role="group" aria-label="Basic example">
     <button type="button" 
     onClick={()=>{
       editarEmpleado(val);
        } 
     }
     className="btn btn-info">Editar</button>
     <button type="button"
     onClick={()=>{
       deleteEmple(val);
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
 );
}

export default Empleados