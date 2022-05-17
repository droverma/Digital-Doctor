const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
})

io.on("connection", (socket) => {
	// socket.emit("me", socket.id)
	// socket.on("disconnect", () => {
	// 	io.broadcast.emit("callEnded")
	// })
	socket.on("disconnect", () => {
		console.log("User Disconnected", socket.id);
	});

	socket.on("me", (data) => {
		socket.emit("me", socket.id)
	});

	socket.on("callUser", (data) => {
		console.log(data)
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})
	socket.on("updateMyMedia", ({ type, currentMediaStatus }) => {
		console.log("updateMyMedia");
		socket.broadcast.emit("updateUserMedia", { type, currentMediaStatus });
	});

	socket.on("msgUser", ({ name, to, msg, sender }) => {
		io.to(to).emit("msgRcv", { name, msg, sender });
	});

	socket.on("answerCall", (data) => {
		socket.broadcast.emit("updateUserMedia", {
			type: data.type,
			currentMediaStatus: data.myMediaStatus,
		});
		io.to(data.to).emit("callAccepted", data);
	});
	socket.on("endCall", ({ id }) => {
		io.to(id).emit("endCall");
	});
})

server.listen(5000, () => console.log("server is running on port 5000"))