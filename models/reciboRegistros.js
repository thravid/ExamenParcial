const { string } = require('i/lib/util');
const mongoose= require('mongoose');

const reciboSqma=new mongoose.Schema({

        FechaIngreso:String,
        Detalle:String,
        FechaEntrega:String,
        Precio:Number,
        cliente:{type: mongoose.Schema.Types.ObjectId, ref: 'cliente'},
        usuario:{type: mongoose.Schema.Types.ObjectId, ref: 'usuario'}
});

const reciboModel=mongoose.model('reciboRegistros',reciboSqma,'registroRecivo');
module.exports=reciboModel;