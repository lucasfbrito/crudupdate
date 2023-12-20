const express = require("express");
const app=express();
const mysql= require("mysql");
const cors = require("cors");
const generarToken = require("./auth");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(express.json());

//Conexion a base de datos
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"formis829",
    database:"empleados_crud"
});

//Empleados
//Se utiliza para crear un empleado

app.post("/createempleados", (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
  
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
    jwt.verify(token, 'fede', (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expirado, reinicia sesión' });
          
        } else {
          return res.status(401).json({ message: 'Token inválido' });
        }
      }
  
      // Si el token es válido, se procede con la inserción en la base de datos
      db.query("INSERT INTO empleados(nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)",
        [nombre, edad, pais, cargo, anios],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al insertar en la base de datos' });
          }
  
          res.status(200).json({ message: 'Datos insertados correctamente', result });
        }
      );
    });
  });

app.get("/empleados",(req,res)=>{   
    db.query("SELECT * FROM  empleados" ,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
        }
    );    

});
//Actualiza los registros de empleados
app.put("/updatempleados",(req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
      }
    
      jwt.verify(token, 'fede', (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado, reinicia sesión' });
            
          } else {
            return res.status(401).json({ message: 'Token inválido' });
          }
        }
     
    db.query("UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=? ", [nombre,edad,pais,cargo,anios,id],
    (err,result)=>{
        if(err){
            console.log(err);

        }else{
            res.send(result);
        }    
        }
    );    
});
 });
// Permite borrar los datos de el empleado
app.delete("/deleteempleado/:id",(req,res)=>{
    const id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
      }
    
      jwt.verify(token, 'fede', (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado, reinicia sesión' });
            
          } else {
            return res.status(401).json({ message: 'Token inválido' });
          }
        }
         });
    db.query("DELETE FROM empleados  WHERE id=? ", [id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        } 
        }
    );    
});


//Clientes
//Se utiliza para crear un cliente
app.post("/createcliente", (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const direccion = req.body.direccion;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  jwt.verify(token, 'fede', (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado, reinicia sesión' });
        
      } else {
        return res.status(401).json({ message: 'Token inválido' });
      }
    }

    // Si el token es válido, se procede con la inserción en la base de datos
    db.query("INSERT INTO clientes(nombre, edad, pais, direccion) VALUES (?, ?, ?, ?)",
      [nombre, edad, pais, direccion],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error al insertar en la base de datos' });
        }

        res.status(200).json({ message: 'Datos insertados correctamente', result });
      }
    );
  });
});
app.get("/clientes",(req,res)=>{   
  db.query("SELECT * FROM  clientes" ,
  (err,result)=>{
      if(err){
          console.log(err);
      }else{
          res.send(result);
      }
      }
  );    
});
//Actualiza los registros de clientes
app.put("/updateclientes",(req,res)=>{
  const token = req.headers.authorization.split(' ')[1];
  const idcliente = req.body.idcliente;
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const direccion = req.body.direccion;
  
  if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
  
    jwt.verify(token, 'fede', (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expirado, reinicia sesión' });
          
        } else {
          return res.status(401).json({ message: 'Token inválido' });
        }
      }
   
  db.query("UPDATE clientes SET nombre=?,edad=?,pais=?,direccion=? WHERE idcliente=? ", [nombre,edad,pais,direccion,idcliente],
  (err,result)=>{
      if(err){
          console.log(err);

      }else{
          res.send(result);
      }    
      }
  );    
});
});
// Permite borrar los datos de el cliente
app.delete("/deletecliente/:id",(req,res)=>{
  const idcliente = req.params.idcliente;
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
  
    jwt.verify(token, 'fede', (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expirado, reinicia sesión' });
          
        } else {
          return res.status(401).json({ message: 'Token inválido' });
        }
      }
       });
  db.query("DELETE FROM clientes  WHERE idcliente=? ", [idcliente],
  (err,result)=>{
      if(err){
          console.log(err);
      }else{
          res.send(result);
      } 
      }
  );    
});

//Ventas
//Se utiliza para crear una venta
app.post("/createventa", (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const nombre = req.body.nombre;
  const monto = req.body.monto;
  const descripcion = req.body.descripcion;
  const idcliente = req.body.idcliente;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  jwt.verify(token, 'fede', (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado, reinicia sesión' });
        
      } else {
        return res.status(401).json({ message: 'Token inválido' });
      }
    }

    // Si el token es válido, se procede con la inserción en la base de datos
    db.query("INSERT INTO ventas(nombre_venta, monto, descripcion_venta, idcliente) VALUES (?, ?, ?, ?)",
      [nombre, monto, descripcion, idcliente],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error al insertar en la base de datos' });
        }

        res.status(200).json({ message: 'Datos insertados correctamente', result });
      }
    );
  });
});

app.get("/ventas",(req,res)=>{   
  db.query("SELECT * FROM  ventas" ,
  (err,result)=>{
      if(err){
          console.log(err);
      }else{
          res.send(result);
      }
      }
  );    
});

app.put("/updateventas",(req,res)=>{
  const token = req.headers.authorization.split(' ')[1];
  const idventa = req.body.idventa;
  const nombre = req.body.nombre;
  const monto = req.body.monto;
  const descripcion = req.body.descripcion;
  const idcliente = req.body.idcliente
  
  if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
  
    jwt.verify(token, 'fede', (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expirado, reinicia sesión' });
          
        } else {
          return res.status(401).json({ message: 'Token inválido' });
        }
      }
   
  db.query("UPDATE ventas SET nombre_venta=?,monto=?,descripcion=?,idcliente=? WHERE idventa=? ", [nombre,monto,descripcion,idcliente],
  (err,result)=>{
      if(err){
          console.log(err);

      }else{
          res.send(result);
      }    
      }
  );    
});
});


app.post("/register", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // Verificar si el usuario o el correo ya existen en la base de datos
  db.query("SELECT * FROM registro WHERE username = ? OR email = ?", [username, email], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send({ message: "Error al verificar duplicados" });
      } else {
          if (result.length > 0) {
              // Usuario o correo ya existen, enviar mensaje8
              const userusado = result[0];
              if (userusado.username === username) {
                  res.status(400).send({ message: "El nombre de usuario ya está en uso" });
              } else if (userusado.email === email) {
                  res.status(400).send({ message: "El correo electrónico ya está en uso" });
              }
          } else {
              // Usuario y correo no existen, proceder con el registro
              bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
                  if (hashErr) {
                      console.error(hashErr);
                      res.status(500).send({ message: "Error al generar hash de contraseña" });
                  } else {
                      db.query("INSERT INTO registro (username, email, password) VALUES (?, ?, ?)",
                          [username, email, hashedPassword],
                          (insertErr, insertResult) => {
                              if (insertErr) {
                                  console.error(insertErr);
                                  res.status(500).send({ message: "Error al registrar el usuario" });
                              } else {
                                  res.status(200).send({ message: "Usuario registrado exitosamente" });
                              }
                          }
                      );
                  }
              });
          }
      }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM registro WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const datos = result[0];
    const hashedPassword = datos.password;

    try {
      const esIgual = await bcrypt.compare(password, hashedPassword);

      if (esIgual) {
        const token = generarToken(datos);
        console.log("Credenciales correctas", token);
        return res.status(200).json({ message: "Inicio exitoso", token, datos: JSON.stringify(datos) });
      } else {
        console.log("Credenciales incorrectos");
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error en la comparación de contraseñas" });
    }
  });
});






app.listen(3001,()=>{console.log("Corriendo en el puerto 3001")}); 




