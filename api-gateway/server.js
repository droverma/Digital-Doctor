const gateway = require("fast-gateway");
const express = require("express");
const cors = require("cors")
const app = express();
const PORT = 8080;

const server = gateway({
  routes: [
    {
      prefix: "user-service",
      target: "http://localhost:8085",
    },
    {
      prefix: "slot-service",
      target: "http://localhost:8084",
    },
    {
      prefix: "appointment-service",
      target: "http://localhost:8081",
    },
    {
      prefix: "video-chat-service",
      target: "http://localhost:8083",
    },
    {
      prefix: "email-service",
      target: "http://localhost:8082",
    },
    {
      prefix: "socket-service",
      target: "http://localhost:5000",
    },
    {
      prefix: "",
      target: "http://localhost:3000",
    },
  ],
});

const corsOptions = {
  origin: ["http://localhost:3003", "http://localhost:3000"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
server.get("/test", (req, res) => {
  res.json({ message: "Server Called" });
});

server.start(PORT).then((server) => {
  console.log(`Gateway is running on port http://localhost:${PORT}`);
});
