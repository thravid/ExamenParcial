const express = require('express');
const request = require('supertest');
const registroRutas=require('../../rutas/registroRuta');
const reciboModel=require('../../models/reciboRegistros');

const mongoose=require('mongoose');

const app=express();
app.use(express.json());
app.use('/registroClientes',registroRutas);
describe('pruebas unitarias reciboRegistro',()=>{
     //ejecuta antes de iniciar las pruebas
     beforeEach(async()=>{
        await mongoose.connect('mongodb://127.0.0.1:27017/Tintoreria',{
          useNewUrlParser :true,
        });
        await reciboModel.deleteMany({});
   });
   //al finalizar las pruebas
   afterAll(()=>{
        return mongoose.connection.close();


   }); 
   //1 prueba
   test('traera todos los registros : GET: getRegistros',async()=>{
     await reciboModel.create({FechaIngreso:'20-05-2024',
          Nombre:"Daniel Torrejon",
          Detalle:"traje Guindo 2 pz",
          FechaEntrega:"21-05-2024",
          Precio:20});
     await reciboModel.create({FechaIngreso:'20-05-2024',
          Nombre:"Roberto Mamani",
          Detalle:"2 trajes verdes 2 pz",
          FechaEntrega:"21-05-2024",
          Precio:30});
          //solicitud de request
  const res= await request(app).get('/registroClientes/traerRegistros');
          //verificar la respuesta
          
          expect (res.statusCode).toEqual(200);
          expect (res.body).toHaveLength(2);

   },10000);
   test('Deberia de añadir un nuevo registro: POST: /Crear',async ()=>{

          const nuevoRegistro= {FechaIngreso:'18-05-2024',
          Nombre:'Cristian Carrazco',
          Detalle:'1 traje azul 3pz',
          FechaEntrega:'22-05-2024',
          Precio:20

          };
          const res= await request(app).post('/registroClientes/registrar')
          .send(nuevoRegistro);
          expect(res.statusCode).toEqual(201);
          expect(res.body.Nombre).toEqual(nuevoRegistro.nuevoRegistro);
   });
   test('Deberia de actualizar un registro que ya existe:PUT: /editar', async()=>{
          //creamos un nuevo resgistro puesto que se eliminaran los datos 
          const RegistroNuevo=await reciboModel.create({
          FechaIngreso:'21-05-2024',
          Nombre:'Danienla Gomez',
          Detalle:'1 traje azul marino 2 pz',
          FechaEntrega:'22-05-2024',
          Precio:20
          });
          const registroActualizado= {
               FechaIngreso:'21-05-2024',
               Nombre:'Danienla Gomez EDITADO',
               Detalle:'1 traje azul marino 2 pz EDITADO',
               FechaEntrega:'22-05-2024',
               Precio:20
               };
               const res = await request(app).put('/registroClientes/editar/'+RegistroNuevo._id).send(registroActualizado);
               expect(res.statusCode).toEqual(200);
               expect(res.body.Nombre).toEqual(registroActualizado.Nombre);

   });
   test('Deberia de Eliminar :delete:/eliminarRegistro/:id ',async()=>{

          const crearRegistro= await reciboModel.create({
               FechaIngreso:'21-05-2024',
               Nombre:'Daniel Herredia',
               Detalle:'1 traje azul marino 2 pz EDITADO',
               FechaEntrega:'22-05-2024',
               Precio:20
          });
          const res= await request(app).delete('/registroClientes/eliminarRegistro/'+crearRegistro._id);
          expect(res.statusCode).toEqual(200);
          expect(res.body).toEqual({mensaje :  'registro eliminado'});
   });
});