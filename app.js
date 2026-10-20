const express = require('express');
const app = express();
const PORT = 3000;



// Middleware propio: Registra Método HTTP y Ruta en la consola
app.use((req, res, next) => {
  const fecha = new Date().toISOString();
  console.log(`[${fecha}] ${req.method} ${req.url}`);
  next(); // Pasa la ejecución a la siguiente ruta o middleware
});

// Middleware para procesar JSON recibido en req.body
app.use(express.json());


//ruta inicio//

app.get('/inicio', (req,res)=>{
  return res.status(200).json({
    mensaje:"Bienvenido ala prueba API",
    estado:"Estable"
  });
});

//ruta informacion//

app.get('/informacion',(req,res)=>{
  return res.status(200).json({
    servicio:"Gestion de pruebas API",
    version: "10.2",
    descripcion:"API servicio Backend",
    entorno:"desarrollo"
  })
})

app.post('/solicitudes',(req,res)=>{
  const {nombre,apellido,correo} =req.body;


  if (!nombre || !apellido || !correo){
    return res.status(400).json({
      error:"peticion erronea",
      mensaje:" los campos son obligatorios"
    });
  }
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regexCorreo.test(correo)) {
    return res.status(400).json({
      error: "datos incorrectos",
      mensaje: "el correo no es valido"
    })
  }

  return res.status(201).json({
    mensaje: "solicitud recibida",
    datos:{nombre, apellido, correo}
  });
});

app.use((req,res)=>{
  return res.status(404).json({
    error: "Ruta no se encuentra",
    mensaje: "La ruta '${req.url}' con el metodo '${req.method}' no exite en el servidor"
  })
})


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});