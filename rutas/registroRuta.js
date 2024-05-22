const express=require('express');
const rutas=express.Router();
const reciboModel=require('../models/reciboRegistros');
const usuarioModel=require('../models/usuario');
const entregaModel=require('../models/entrega');


rutas.get('/traerRegistros',async(req, res)=>{
    try{

        const reciboObtenido= await reciboModel.find();
        res.json(reciboObtenido);

    }catch(error){

        res.status(500).json({mensaje:error.message});
    }
});
// registrar en mongo un nuego resgistro
rutas.post('/registrar',async(req, res)=>{

    const nuevoRegistro= new reciboModel({
        FechaIngreso:req.body.FechaIngreso,
        Nombre:req.body.Nombre,
        Detalle:req.body.Detalle,
        FechaEntrega:req.body.FechaEntrega,
        Precio:req.body.Precio,
        usuario:req.body.usuario
    })
    try{

        const nuevorRegistro=await nuevoRegistro.save();
        res.status(201).json({nuevorRegistro});

    }catch(error){
        res.status(400).json({mensaje:error.message});
    }
});
//endopin editar
rutas.put('/editar/:id',async(req, res)=>{
    try{
        const registroEditado= await reciboModel.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!registroEditado)
            return res.status(404).json({mensaje: 'registro no encontrado '});
        else
            return res.json(registroEditado);
    }catch(error){
        res.status(401).json({mensaje: error.message});
    }
});
rutas.delete('/eliminarRegistro/:id',async(req, res)=>{
    try{
        const registroEliminado=await reciboModel.findByIdAndDelete(req.params.id);
        if(!registroEliminado)
            return res.status(404).json({mensaje:'registro no encontrado'});
        return res.json({mensaje:'registro eliminado'});
    }catch(error){
        res.status(500).json({mesaje: error.message});
    }
});
// buscar por nombre mensa
rutas.get('/BsqNombre/:nombre', async(req, res)=>{
    try{
        const registroPorNombre= await reciboModel.find({Nombre: req.params.nombre});
        console.log(req.params.nombre);
        if(!registroPorNombre)
            return res.status(404).json({mensaje: 'no se econtro registro con ese nombre'});
        return res.json(registroPorNombre);
    }catch(error){
        res.status(500).json({mensaje: error.message});
    }
     
});
rutas.get('/contarRecibosNombre/:nombre', async(req, res)=>{
    try{
        const registroPorNombre= await reciboModel.countDocuments({Nombre: req.params.nombre});
        
        if(!registroPorNombre)
            return res.status(404).json({mensaje: 'no se econtro registro con ese nombre'});
        return res.json({registrados_con_este_nombre_hay:registroPorNombre});
    }catch(error){
        res.status(500).json({mensaje: error.message});
    }
     
});
rutas.get('/BsqNombrePrenda/:nombre/:prenda', async(req, res)=>{
    try{
        const nombrePrenda= await reciboModel.countDocuments({Nombre: req.params.nombre}).find({Detalle: new RegExp(req.params.prenda,'i')});
        
        if(!nombrePrenda)
            return res.status(404).json({mensaje: 'no se econtro registro con ese nombre y prenda'});
        return res.json({nombrePrenda});
    }catch(error){
        res.status(500).json({mensaje: error.message});
    }
   
});
rutas.get('/porFecha/:fecha1/:fecha2', async(req, res)=>{
   
   
   //const porFecha= await reciboModel.find({FechaEntrega:new Date("12-07-24")});
   
   try{
    const porFecha= await reciboModel.find({FechaEntrega: {$gte:req.params.fecha1, $lte: req.params.fecha2}});
    
    if(!porFecha)
        return res.status(404).json({mensaje: 'no se econtro registro en estas fechas'});
    return res.json(porFecha);
}catch(error){
    res.status(500).json({mensaje: error.message});
}
   
});

//// por fecha y nombres
rutas.get('/porFechaNombre/:nombre/:fecha1/:fecha2', async(req, res)=>{
    try{
        const FechaNombre= await reciboModel.countDocuments({Nombre: req.params.nombre}).find({FechaEntrega: {$gte:req.params.fecha1, $lte: req.params.fecha2}});
        
        if(!FechaNombre)
            return res.status(404).json({mensaje: 'no se econtro registro con ese nombre y fecha'});
        return res.json({FechaNombre});
    }catch(error){
        res.status(500).json({mensaje: error.message});
    }
   
});
/// por fechas  de ingreso
rutas.get('/Fechaingreso/:fecha', async(req, res)=>{
    try{
        const FechaIngreso= await reciboModel.find({FechaIngreso: req.params.fecha});
        
        if(!FechaIngreso)
            return res.status(404).json({mensaje: 'no se econtro registro con ese nombre y fecha'});
        return res.json({FechaIngreso});
        console.log(req.params.fecha);
    }catch(error){
        res.status(500).json({mensaje: error.message});
    }
   
});
// copn el nuevo modelo REGISTRAR

rutas.post('/registrarEntrega',async(req, res)=>{

    const nueva= new entregaModel({
        FechaEntrega:req.body.FechaEntrega,
        Nombre:req.body.Nombre,
        Detalle:req.body.Detalle,
        Precio:req.body.Precio,
        CodRecibo:req.body.CodRecibo,
    
        })
        try{
            await nueva.save();
            res.status(200).json(nueva);
        }catch(error){
            res.json(error);
        }
    
});

//eLIMINAR un registro  ENETREGA
rutas.delete('/eliminarEntrega/:id',async(req, res)=>{
    try{
        const registroEliminado=await entregaModel.findByIdAndDelete(req.params.id);
        if(!registroEliminado)
            return res.status(404).json({mensaje:'registro no encontrado'});
        return res.json({mensaje:'registro eliminado'});
    }catch(error){
        res.status(500).json({mesaje: error.message});
    }
});

// Editar registro entrega
rutas.put('/editarEntrega/:id',async(req, res)=>{
    try{
        const registroEditado= await entregaModel.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!registroEditado)
            return res.status(404).json({mensaje: 'registro no encontrado '});
        else
            return res.json(registroEditado);
    }catch(error){
        res.status(401).json({mensaje: error.message});
    }
});

//buscarTodas las entregas
rutas.get('/traerEntregas',async(req, res)=>{
    try{

        const Entrefas= await entregaModel.find();
        res.json(Entrefas);

    }catch(error){

        res.status(500).json({mensaje:error.message});
    }
});

// reportes  
rutas.get('/registrosPorUsuarios/:idUsuario', async(req, res)=>{

    const {idUsuario}=req.params;
    console.log(idUsuario);
    try{
        const usuario=await usuarioModel.findById(idUsuario);
        console.log(usuario);
        if(!usuario)
            return res.status(404).json({mensaje:'usuario no encontrado'});
        const registros = await reciboModel.find({usuario:idUsuario}).populate('usuario');
        console.log(registros);
        res.json(registros);
        
    }catch(error){
        res.json({Error: error.menssage});
    }

})
module.exports=rutas;