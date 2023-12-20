import React from 'react'
import './estilos/clientes.css'
import{useState} from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

// Funcion principal del componente
function Ventas() {

    // Definicion de estados para los campos del formulario
  const[nombre,setnombre]=useState("");
  const[monto,setmonto]=useState("");
  const[descripcion,setedescripcion]=useState();
  const[idcliente,seticliente]=useState("");
  const[idventa,setidventa]=useState();
  const[fecha,setfecha]=useState();
  const[editar,seteditar]=useState(false);

// Estado para almacenar la lista de ventas
  const [ventasList,setventas]= useState([]);
// Obtiene el token almacenado en el localStorage
    const token = localStorage.getItem('token');

    // Función para agregar un nuevo cliente
    const add = () => {
        // Verificar si los campos obligatorios están completos
        if (!nombre|| !monto || !descripcion || !idcliente) {
         // Mostrar mensaje de error o manejar la falta de campos obligatorios
         // Por ejemplo:
         alert('Por favor, complete todos los campos obligatorios.');
         return;
       }

    // Validar el formato de el monto (asegurarse de que sea un número)
    const parsedmonto = parseFloat(monto);
        if (isNaN(parsedmonto) || parsedmonto <= 0) {
    // Mostrar mensaje de error o manejar el formato incorrecto de el monto
    // Por ejemplo:
         alert('Por favor, ingrese un monto valido');
         return
    };


     // Realiza la solicitud para agregar una nueva venta
     Axios.post("http://localhost:3001//createventa", {
        nombre: nombre,
        monto: monto,
        descripcion: descripcion,
        idcliente: idcliente,
      },  { 
        headers: {
          'Authorization': `Bearer ${token}` 
        }
    }).then(() => {
        getventas();
        limpiarCampos();
      // Muestra un mensaje al registrar correctamente una venta
        Swal.fire({
          title: "<strong> Registro exitoso</strong>",
          html: "<i>La venta <strong>" + [nombre] + "</strong> fue registrada con éxito</i>",
          icon: 'success',
          timer: 3000
        });
      });
    };


    // Función para actualizar una vebta
    const update = ()=>{
        // Verificar si los campos obligatorios están completos
    if (!nombre || !monto || !descripcion || !idcliente) {
    // Mostrar mensaje de error o manejar la falta de campos obligatorios
    // Por ejemplo:
    alert('Por favor, complete todos los campos obligatorios.');
    return;
    }

    // Validar el formato de el monto (asegurarse de que sea un número)
    const parsedmonto = parseFloat(monto);
        if (isNaN(parsedmonto) || parsedmonto <= 0) {
    // Mostrar mensaje de error o manejar el formato incorrecto de el monto
    // Por ejemplo:
         alert('Por favor, ingrese un monto valido');
         return
    };

    // Realiza la solicitud para actualizar una venta
    Axios.put("http://localhost:3001/updateventas",{
    idventa: idventa,  
    nombre: nombre,
    monto: monto,
    descripcion: descripcion,
    idcliente: idcliente,
    fecha: fecha,
    },{ 
        headers: {
        'Authorization': `Bearer ${token}` 
        }
    }
    ).then(()=>{
        getventas();
        limpiarCampos();
        // Muestra un mensaje al actualizar correctamente una venta
        Swal.fire({
        title: "<strong> Actualizacion exitosa!!</strong>",
        html:`<i>La venta<strong>${nombre}</strong> fue actualizada con éxito!!</i>`,
        icon: 'success',
        timer:3000
        })
    });
    };

    // Función para limpiar los campos del formulario
  const limpiarCampos = ()=>{
    setnombre("");
    setmonto("");
    setedescripcion("");
    seticliente("");
    setfecha("");
    setidventa("");
    seteditar(false);
  }

  // Función para obtener la lista de ventas
 const getventas =()=>{
    Axios.get("http://localhost:3001/ventas"
   ).then((response)=>{
  setventas(response.data);
    });
  };

  // Función para activar el modo de edición de un empleado
  const editarventa = (val) => {
    seteditar(true);
    setnombre(val.nombre);
    setmonto(val.monto);
    setedescripcion(val.descripcion);
    seticliente(val.idcliente);
    setfecha(val.fecha);
    setidventa(val.idventa);
};

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <Link to="/app"><p className="navbar-brand" href="#">Gestor</p></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
      <Link to="/empleados"><p className="nav-link active" aria-current="page" href="#">Empleados</p></Link>
      <Link to="/clientes"><p className="nav-link" href="#">Clientes</p></Link>
      <Link to="/Ventas">  <p className="nav-link" href="#">Ventas</p></Link>
      <Link to="/"><a className="nav-link disabled" aria-disabled="true">Cerrar sesion</a></Link>
      </div>
    </div>
  </div>
</nav>
    <div className="container">
          <div className="card text-center">
        <div className="card-header">
          Gestion de Ventas
        </div>
        <div className="card-body">
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Nombre:</span>
        <input type="text" 
        onChange={(event)=>{setnombre(event.target.value);
        }
        }
        className="form-control" value={nombre}     placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
     </div>
    
      <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Monto</span>
  <input type="number" 
  onChange={(event)=>{setmonto(event.target.value);
  }
  }
  className="form-control" value={monto}    placeholder="Monto" aria-label="Username" aria-describedby="basic-addon1"/>
</div>


<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Descripcion</span>
  <input type="text" 
  onChange={(event)=>{setedescripcion(event.target.value);
  }
  }
  className="form-control" value={descripcion}   placeholder="Descripcion" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Id Cliente</span>
  <input type="text" 
  onChange={(event)=>{seticliente(event.target.value);
  }
  }
  className="form-control" value={idcliente}   placeholder="Descripcion" aria-label="Username" aria-describedby="basic-addon1"/>
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
        <button className='btn btn-success'  id='btn'  onClick={getventas}>Mostrar registros</button>
        </div>
      </div>

      <table className="table table-striped">
      <thead>
    <tr>
      <th scope="col">IdVenta</th>
      <th scope="col">Nombre</th>
      <th scope="col">Monto</th>
      <th scope="col">Descripcion</th>
      <th scope="col">Fecha</th>
      <th scope="col">Cliente</th>
    </tr>
  </thead>
  <tbody>{
  ventasList.map((val,key)=>{
    return <tr key={val.idventa}>
      <th >{val.idventa}</th>
      <td>{val.nombre}</td>
      <td>{val.monto}</td>
      <td>{val.descripcion}</td>
      <td>{val.fecha}</td>
      <td>{val.idcliente}</td>
      <td>
      <div className="btn-group" role="group" aria-label="Basic example">
      <button type="button" 
      onClick={()=>{
        editarventa(val);
         } 
      }
      className="btn btn-info">Editar</button>
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

export default Ventas;