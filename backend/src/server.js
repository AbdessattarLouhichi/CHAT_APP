import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import db from "./config/db.js";
import { sessionSecret } from "./config/config.js";
import session from "express-session";

import authRoutes from "./routes/auth.routes.js"

//initialize app
const app = express();

/* ----Socket.IO enables real-time bidirectional event-based communication----  */
//Pass the Express app into the HTTP Server instances
const httpServer = createServer(app);
//pass the httpServer to socket.io
export const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost"]
  },
  cookie: {
    sameSite: 'strict',
    secure: true,
  }
});

// handle socket server




//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.disable("etag");
app.use(bodyParser.json());
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 2 },
  })
);


// connect to database
db.connect();
const PORT = process.env.PORT || 5001;

//make sure to call .listen on the http server
httpServer.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});



app.use('/api', authRoutes)