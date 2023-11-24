const { dirname } = require("path");
const sequelize = require("./config/connection")
const express = require('express');
const app = express();
const http = require("http").createServer(app);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const io=require('socket.io')(http);
const PORT = process.env.PORT || 3000;
io.on("connection", function(socket){
    io.emit("user connected");
    socket.on("message", function(msg){
        io.emit("message", msg);
    });
});



// Static directory
app.use(express.static('public'));
sequelize.sync({ force: false }).then(function() {
    http.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
});