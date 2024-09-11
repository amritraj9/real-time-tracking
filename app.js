const express =require('express');
const app =express();
const socketio= require("socket.io");
const http = require("http");//socket io need http server to run
const path = require('path');


const server=http.createServer(app);//it will create a server for express named app
const io =socketio(server);// line 4 to 7 are the boiler plate for socket.io
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id,...data});
    });
    console.log("connected");//this will get request from the script.js 1st line 
    //extra:- all the chatting app is created by socket.io

socket.on("disconnect",function(){
    io.emit("user-disconnected",socket.id);
});
});


app.get("/",function(req,res){
    res.render("index");
})

server.listen(3000);//this will work on localhost:3000 and it is express

//sometimes when u add a folder u need to terminate the running server and restart like in line number 11 i added a folder so i have to terminate the running server with commands following
//netstat -ano | findstr :3000
//taskkill /PID <PID> /F Replace <PID> with the process ID you found in the previous step.


