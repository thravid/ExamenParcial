const express= require('express');
const mongoose=require('mongoose');
const authRutas=require('./rutas/auten');
const Usuario=require('./models/usuario');
const entrega=require('./models/entrega');

const jwt = require('jsonwebtoken');
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

//app.use('/registroClientes',reciboRutas);
const autentificar=async (req, res,next)=>{
    try{    
            const token= req.headers.authorization?.split(' ')[1];
            if(!token)
                res.status(400).json({mensaje:'token no existe'});
            const decodificar=jwt.verify(token,'clave_secreta');
            req.usuario=await Usuario.findById(decodificar.usuarioId);
            next();
            
    }catch(error){
        res.status(400).json({mensaje:'token invalido'});
    }
};
app.use('/auth',authRutas);
app.use('/registroClientes',autentificar,reciboRutas);