const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/canciones", (req, res) => {
  fs.readFile("repertorio.json", "utf8", (err, data) => {
    res.json(JSON.parse(data));
  });
});

app.post("/canciones", (req, res) => {
  fs.readFile("repertorio.json", "utf8", (err, data) => {
    const canciones = JSON.parse(data);
    const nuevaCancion = req.body;
    canciones.push(nuevaCancion);
    fs.writeFile("repertorio.json", JSON.stringify(canciones), () => {
      res.json({ message: "Canción agregada correctamente" });
    });
  });
});

app.put("/canciones/:id", (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  fs.readFile("repertorio.json", "utf8", (err, data) => {
    let canciones = JSON.parse(data);
    const indice = canciones.findIndex((c) => c.id === id);
    canciones[indice] = datosActualizados;
    fs.writeFile("repertorio.json", JSON.stringify(canciones), () => {
      res.json({ message: "Canción actualizada correctamente" });
    });
  });
});

app.delete("/canciones/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("repertorio.json", "utf8", (err, data) => {
    let canciones = JSON.parse(data);
    const indice = canciones.findIndex((c) => c.id === id);
    canciones.splice(indice, 1);
    fs.writeFile("repertorio.json", JSON.stringify(canciones), () => {
      res.json({ message: "Canción eliminada correctamente" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
