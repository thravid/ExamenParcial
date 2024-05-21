const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const usuarioSchema= new mongoose.Schema({

    nombreUsuario:{
        type : String,
        required:true,
        unique:true
    },
    correo:{
        type: String,
        required: true,
        unique:true
    },
    contrasenia:{
        type:String,
        required:true,
        
    }
});

//hasheo de la contraseña
usuarioSchema.pre('save',async function(next ){
    if(this.isModified('contrasenia')){
        this.contrasenia=await bcrypt.hash(this.contrasenia,10);
    }
        next();
});
usuarioSchema.methods.compareContrasenia=async function(contraseniaComparada){
    return await bcrypt.compare(contraseniaComparada,this.contrasenia);
};
const usuarioModel= mongoose.model('usuario',usuarioSchema,'UsuarioBD');
module.exports=usuarioModel;