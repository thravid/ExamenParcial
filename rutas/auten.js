const express=require('express');
const rutas=express.Router();
const Usuario=require('../models/usuario');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');

rutas.post('/registro', async(req, res)=>{

    try{
    const {nombreUsuario, correo, contrasenia}=req.body;
    const usuario=new Usuario({nombreUsuario,correo, contrasenia});
    await usuario.save();
    res.status(201).json({mensaje:'usuario Registrado'});
    }catch(error){
        res.status(500).json({mensaje: error.message})
    }
});
rutas.post('/iniciarSecion',async(req, res)=>{

    try{

        const {correo,contrasenia}=req.body;
        const usuario=await Usuario.findOne({correo});
        if(!usuario)
            return res.status(404).json({error:'El correo no existe'});
        const validarContrasenia= await usuario.compareContrasenia(contrasenia);
        if(!validarContrasenia)
            return res.status(404).json({error:'Error de contraseña'});
        const token =jwt.sign({usuarioId:usuario._id},'clave_secreta',{expiresIn:'3h'});
        res.json({token});
    }catch(error){
        res.status(500).json({mensaje: error.message})
    }
});
module.exports=rutas;