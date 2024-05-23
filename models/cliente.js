const { string } = require('i/lib/util');
const mongoose= require('mongoose');

const cliSqma=new mongoose.Schema({

        Nombre:String,
        Telefono:Number,
        contactoRespaldo:Number,
        usuario:{type: mongoose.Schema.Types.ObjectId, ref: 'usuario'}
});

const clienteModel=mongoose.model('cliente',cliSqma,'ClienteBD');
module.exports=clienteModel;