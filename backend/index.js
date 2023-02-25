const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors")

const DB_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "Ocean";

async function main () {
  // conexão com o banco de dados
  console.log("Conectando com banco de dados...")
  const client = await MongoClient.connect(DB_URL)
  const db = client.db(DB_NAME)
  const collection = db.collection("itens")
  console.log("Banco de dados conectado com sucesso!!!")

  const app = express();

  app.use(cors())
  // O que vier no body da requisição, está em JSON
  app.use(express.json());

  // Endpoint / -> Hello World
  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  // Endpoint /oi -> Olá, mundo!
  app.get("/oi", function (req, res) {
    res.send("Olá, mundo!");
  });

  // Lista de informações
  const itens = ["Rick Sanchez", "Morty Smith", "Summer Smith"];
  //              0               1              2

  // CRUD -> Lista de informações

  // Endpoint Read All -> [GET] /item
  app.get("/item", async function (req, res) {
    const documentos = await collection.find().toArray()
    res.send(documentos);
  });

  // Endpoint Read Single by ID -> [GET] /item/:id
  app.get("/item/:id",async function (req, res) {
    const id = req.params.id;
    const item = await collection.findOne({ _id: new ObjectId (id)});
    res.send(item);
  });


  // Endpoint Create -> [POST] /item
  app.post("/item", async function (req, res) {
    // console.log(req.body);
    const item = req.body;
    collection.insertOne(item)    
    res.send(item);
  });

  //Endpoint Update -> [PUT] /item/:id
  app.put("/item/:id", async function(req,res){
    const id = req.params.id;
    const body = req.body;

    await collection.updateOne(
      {_id: new ObjectId(id)},
      {$set:body}

      );
      
      
      res.send(body);
  });

  app.delete("/item/:id", async function (req,res){
    const id = req.params.id;
    
    await collection.deleteOne({ _id: new ObjectId(id)})

    res.send("Item removido com sucesso")
  });
 
  const porta = process.env.PORT || 3000;
  app.listen(porta,function (){
    console.log("Servidor rodando na porta: " + porta)
  });
}

main();