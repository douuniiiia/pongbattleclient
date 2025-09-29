import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let players = {};

io.on("connection", (socket) => {
  players[socket.id] = { ready: false };

  socket.on("ready", () => {
    if (players[socket.id]) {
      players[socket.id].ready = true;
      checkStartCondition();
    }
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
  });
});

function checkStartCondition() {
  const connectedCount = Object.keys(players).length;

  if (connectedCount === 3) {
    const allReady = Object.values(players).every(p => p.ready);
    if (allReady) {
      io.emit("start", { time: Date.now() });
    }
  }
}

httpServer.listen(3000, () => {
  console.log("En écoute sur http://localhost:3000");
});
