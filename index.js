const express= require('express');
const mongoose=require('mongoose');
require('dotenv').config();
const app=express();
const PORT=process.env.PORT|| 9000;
const MONGO_URI=process.env.MONGO_URI;

const reciboRutas=require('./rutas/registroRuta');
app.use(express.json());

mongoose.connect(MONGO_URI).then(()=>{

    console.log('conexion exitosa');
    app.listen(PORT,()=>{console.log('corriento en el puerto '+PORT)})
}).catch(error=> console.log('error de conexion '+error));

app.use('/registroClientes',reciboRutas);
