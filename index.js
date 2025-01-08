const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./db/connectDB");
const verifyAuctioneerToken = require('./middleware/auctioneer.token.verification');
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

const adminAuthRouter = require('./routes/admin.auth.route');
app.use("/admin", adminAuthRouter);

const customerAuthRouter = require("./routes/customer.auth.route");
app.use("/customer", customerAuthRouter);

const auctionRouter = require("./routes/auction.route");
app.use("/auction", auctionRouter);

const playersRouter = require("./routes/players.route");
app.use("/players", playersRouter);

const franchiseAuthRouter = require('./routes/franchise.auth.route');
app.use("/franchise", franchiseAuthRouter);

const auctioneerAuthRouter = require("./routes/auctioneer.auth.route");
app.use("/auctioneer", auctioneerAuthRouter);


io.use((socket, next) => {
    const auctioneer_token =  socket.handshake.auth.auctioneer_token;
    if (!auctioneer_token) {
        return next(new Error("Authentication error"));
    }
    
})
// Socket.IO logic
io.on("connection", (socket) => {
    console.log("Franchise connected: ", socket.id);

    // Join a room based on ID
    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    // Handle API call requests from room
    socket.on("callAPI", async ({ roomId, apiEndpoint }) => {
        console.log(`Room ${roomId} requested API call: ${apiEndpoint}`);
        // Make API call here (e.g., using axios or fetch)
        // Example:
        // const response = await axios.get(apiEndpoint);

        // Broadcast API response to the room
        io.to(roomId).emit("apiResponse", { roomId, data: "Sample API Response" });
    });

    socket.on("disconnect", () => {
        console.log("Franchise disconnected: ", socket.id);
    });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    connectDB();
    console.log("Port running on", PORT);
});
