const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

app.use(express.static("public"));
app.use(express.json());

const userScheme = new Schema({
  name: String,
  email: String,
  phone: String
});

const User = mongoose.model("User", userScheme);

async function main() {
  try{
    await mongoose.connect("mongodb://127.0.0.1:27017/bookdb");
    app.listen(3000);
    console.log("Сервер ожидает подключения...");
  }
  catch(err) {
    return console.log(err);
  }
}

// Получение всех пользователей
app.get("/api/users", async (req, res)=>{
  const users = await User.find({});
  res.send(users);
});

// Добавление нового пользователя
app.post("/api/users", async (req, res) =>{
         
  if(!req.body) return res.sendStatus(400);
       
  const userName = req.body.firstName;
  const userEmail = req.body.email;
  const userPhone = req.body.phone;
  const user = new User({name: userName, email: userEmail, phone: userPhone});
  await user.save();
  res.send(user);
});

app.delete("/api/users/:id", async(req, res)=>{  
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
  if(user) res.send(user);
  else res.sendStatus(404);
});

main();

process.on("SIGINT", async() => { 
  await mongoose.disconnect();
  console.log("Приложение завершило работу");
  process.exit();
});

/*
const http = require("http");
const fs = require("fs");

 ////NEED EXPRESS///
http
  .createServer(async (request, response) => {
    if (request.url == "/server") {
      const buffers = [];
      for await (const chunk of request) {
        buffers.push(chunk);
      }

      const data = Buffer.concat(buffers).toString();
      const json = JSON.parse(data); // парсим строку в json
      console.log(data);
      response.end("Данные пришли");
    }
    if (request.url == "/assets/css/style.css") {
      fs.readFile("../css/style.css", (error, data) => {
        response.write(data);
        response.end();
      });
    }
    if (request.url == "/assets/js/main.js") {
      fs.readFile("./main.js", (error, data) => {
        response.write(data);
        response.end();
      });
    } else {
      fs.readFile("../../index.html", (error, data) => {
        response.write(data);
        response.end();
      });
    }
  })
  .listen(3000, () => console.log("Сервер запущен по адресу http://localhost:3000"));
*/