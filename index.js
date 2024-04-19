const express = require("express");
const { readFileSync, writeFileSync } = require("node:fs");
const app = express();
//Server
app.listen(3000, () => {
  console.log("puerto activo");
});
// Middleware
app.use(express.json());


// GET
app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(readFileSync("repertorio.json", "utf-8"));
  res.json(canciones);
});

//POST
app.post("/canciones", (req, res) => {
  const canciones = JSON.parse(readFileSync("repertorio.json"));
  const body = req.body;
  canciones.push(body);
  writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.json("cancion agregada con éxito");
});


//PUT
app.put("/canciones/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const canciones = JSON.parse(readFileSync("repertorio.json", "utf-8"));

  const index = canciones.findIndex((cancion) => cancion.id === id);
  canciones[index] = body;

  writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.json("cancion editada con éxito");
});


//DELETE
app.delete("/canciones/:id", (req, res) => {
  const id = req.params.id;
  const canciones = JSON.parse(readFileSync("repertorio.json", "utf-8"));

  const index = canciones.findIndex((cancion) => cancion.id === id);
  canciones.splice(index, 1);
  writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.json("cancion eliminada con éxito");
});
 