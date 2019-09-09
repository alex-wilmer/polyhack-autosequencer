const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", function(socket) {
  console.log("a user connected");
});

const PORT = 3333;

app.get("*", (req, res) => res.send("hey hey hey"));

http.listen(PORT, function() {
  console.log(`listening on *:${PORT}`);
});
