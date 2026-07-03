import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";
import { connectDB } from "./config/db";
import { initSocket } from "./services/socket/socket.service";

import {
  registerMonitoringSocket
} from "./modules/monitoring/monitoring.socket";

import {
  registerWhiteboardSocket
}
from "./modules/whiteboard/whiteboard.socket";

import {
 startCalendarScheduler
}
from "./modules/calendar/calendar.scheduler";

import {
 registerCalendarSocket
}
from "./modules/calendar/calendar.socket";



connectDB();

const server = http.createServer(app);

const io = initSocket(server);

registerMonitoringSocket(io);


registerWhiteboardSocket(io);

startCalendarScheduler();

registerCalendarSocket(io);

server.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
