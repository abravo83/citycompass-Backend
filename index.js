require("dotenv").config();

const http = require("node:http");
const app = require("./src/app");

const server = http.createServer(app);

const PORT = process.env.PORT || 8040;

server.listen(PORT);

server.on("listening", () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

server.on("error", (error) => {
  console.log(error);
});
