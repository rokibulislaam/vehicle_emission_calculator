const app = require("express")();

const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 80;

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success"
  });
});

io.on("connection", function(socket) {
  console.log(
    `number of connected clients: ${io.sockets.server.httpServer._connections}`
  );
  // setInterval(function() {
  //   io.sockets.emit("currentCount", {
  //     currentCount: new Date().getTime()
  //   });
  // }, 10000);
  console.log("client connected");
  socket.on("count", ({ currentCount }) => {
    console.log(`cunnretCount: ${currentCount}`);
    io.sockets.emit("currentCount", {
      currentCount
    });
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
    console.log(
      `number of connected clients after disconnecting: ${io.sockets.server.httpServer._connections}`
    );
  });
});
