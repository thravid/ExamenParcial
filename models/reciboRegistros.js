const { string } = require('i/lib/util');
const mongoose= require('mongoose');

const reciboSqma=new mongoose.Schema({

        FechaIngreso:String,
        Nombre:String,
        Detalle:String,
        FechaEntrega:String,
        Precio:Number,
        usuario:{type: mongoose.Schema.Types.ObjectId, ref: 'usuario'}
});

const reciboModel=mongoose.model('reciboRegistros',reciboSqma,'registroRecivo');
module.exports=reciboModel;