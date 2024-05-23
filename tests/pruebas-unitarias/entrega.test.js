const express = require('express');
const request = require('supertest');
const registroRutas=require('../../rutas/registroRuta');
const entregaModel=require('../../models/entrega');

const mongoose=require('mongoose');
const app=express();
app.use(express.json());
app.use('/registroClientes',registroRutas);
describe('pruebas unitarias Entregas',()=>{
     //ejecuta antes de iniciar las pruebas
     beforeEach(async()=>{
        await mongoose.connect('mongodb://127.0.0.1:27017/Tintoreria',{
          useNewUrlParser :true,
        });
        
   });
   //al finalizar las pruebas
   afterAll(()=>{
        return mongoose.connection.close();


   }); 
   test('Deberia mostrar el p`rimer reporte : GET: /registrosPorcliente/:idcliente',async()=>{
    
    
         //solicitud de request
 const res= await request(app).get('/registroClientes/MontoCliente');
         //verificar la respuesta
         
         expect (res.statusCode).toEqual(200);
         expect (res.body).toHaveLength(5);

  },10000);
  
});