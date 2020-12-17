var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send(msn);
})

io.on('connection', (socket)=> {
  console.log("user connected: ");
  
  socket.on('chat', (message) => {
    console.log("message:", message);
    io.emit("chat",message);
  })

  socket.on('disconnect', ()=> {
    console.log("user disconnected");
  })
})

http.listen(3000, () => {
  console.log("Listening on port 3000....");
})

