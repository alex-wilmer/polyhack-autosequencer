const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", socket => {
  console.log("a user connected");

  socket.on("x", msg => {
    io.emit("x", msg);
  });
});

const PORT = 3333;

app.get("*", (req, res) => res.send("maybe a UX control here"));

http.listen(PORT, function() {
  console.log(`listening on *:${PORT}`);
});
