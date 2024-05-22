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
        await entregaModel.deleteMany({});
   });
   //al finalizar las pruebas
   afterAll(()=>{
        return mongoose.connection.close();


   }); 
   test('Deberia traera todos las Entregas : GET: /traerEntregas',async()=>{
    await entregaModel.create({FechaEntrega:"22-05-2024",
    Nombre:"Marisol Perez",
    Detalle:"2 polleras",
    Precio:45,
    CodRecibo:"664d3974a8761a672da9e32c"});
    await entregaModel.create({FechaEntrega:"22-05-2024",
    Nombre:"Daniel Cervantes",
    Detalle:"100 camisas",
    Precio:100,
    CodRecibo:"664d3974a8761a672da9e32c"});
         //solicitud de request
 const res= await request(app).get('/registroClientes/traerEntregas');
         //verificar la respuesta
         
         expect (res.statusCode).toEqual(200);
         expect (res.body).toHaveLength(2);

  },10000);
});