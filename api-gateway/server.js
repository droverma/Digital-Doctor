const gateway = require("fast-gateway");

// const cors = require("cors");
// app.use(cors());
const PORT = 8080;

const server = gateway({
  routes: [
    {
      prefix: "",
      target: "http://localhost:3000",
    },
    {
      prefix: "/user-service",
      target: "http://localhost:8085",
    },
    {
      prefix: "/slot-service",
      target: "http://localhost:8084",
    },
    {
      prefix: "/appointment-service",
      target: "http://localhost:8081",
    },
    {
      prefix: "/video-chat-service",
      target: "http://localhost:8083",
    },
    {
      prefix: "/email-service",
      target: "http://localhost:8082",
    },
    {
      prefix: "/socket-service",
      target: "http://localhost:5000",
    },
  ],
});

server.get("/test", (req, res) => {
  res.json({ message: "Server Called" });
});

server.start(PORT).then((server) => {
  console.log(`Gateway is running on port http://127.0.0.1:${PORT}`);
});
