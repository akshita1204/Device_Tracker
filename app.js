const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Setting up static files
app.use(express.static(path.join(__dirname, "public")));

// Setting up the EJS template engine
app.set("view engine", "ejs");

// Handle Socket.IO connections
io.on("connection", function(socket) {
  socket.on("send-location",function(data){
    io.emit("receive location",{id:socket.id, ...data});
  });
   socket.on("disconnect",function(){
    io.emit("user disconnected",socket.id);
   })
});

// Define routes
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});


/*
const express = require('express');
const app = express();
const path=require("path");

//setting the socket io
const http=require('http'); //socket io works in this
const socketIo=require('socket.io');
const server=http.createServer(app);
const io=socketIo(server);

//setting up the ejs
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

io.on("connection",function(socket)
{
    console.log("connected");
});

app.get('/', (req, res) => {
  res.render('index');
});

server.listen(3000);
*/

