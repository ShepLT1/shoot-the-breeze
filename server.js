const express = require('express');
const app = express();
const mongoose = require("mongoose");
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;
const routes = require("./routes");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/shoot-the-breeze",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("Mongoose is hooked up!")
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

app.use(routes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// io.emit sends message/signal to all users
// socket.emit responds only to the sender

let connectedUsers = {}

io.on('connection', (socket) => {
    // send last 25 messages to user once connected; user will have ability (button) to request less recent messages
    let user = socket.id
    connectedUsers[user] = null
    console.log('user ' + user + ' connected');
    socket.on('usernameChange', (uName, id) => {
        connectedUsers[id] = uName
        socket.emit('usernameChange', uName, id)
    })
    socket.on('chat message', (msg, user) => {
        io.emit('chat message', msg, connectedUsers[user]);
    });
    socket.on('disconnect', () => {
        delete connectedUsers[user]
    });
});

server.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });