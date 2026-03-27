import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";
import session from "express-session";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

const app = express();

app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  }),
);

app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/tickets", ticketRoutes)

app.use(errorHandler);

export default app;
