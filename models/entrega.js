const { string } = require('i/lib/util');
const mongoose= require('mongoose');

const entreSqma=new mongoose.Schema({

        FechaEntrega:String,
        Nombre:String,
        Detalle:String,
        Precio:Number,
        CodRecibo:{type: mongoose.Schema.Types.ObjectId, ref: 'reciboRegistros'}
});

const entregaModel=mongoose.model('entrega',entreSqma,'entregaBD');
module.exports=entregaModel;




