import express from "express"; // http reqs. node.js framework for web servers
import mongoose from "mongoose"; // db schemas, models, querying
import dotenv from "dotenv"; // load sensitive variables from a separate .env file
import apiRoutes from "./routes/api"; // our custom routes. where we handle api endpoints

dotenv.config();

// setting up express listening
const app = express();
app.use(express.json()); // middleware to parse json in incoming http reqs

// connecting to mongodb
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable not set");
}
mongoose.connect(process.env.MONGO_URI, { // env for prod
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("Mongo connection error:", err));

// tells server reqs starting with /api should be handled by routes in apiRoutes
app.use("/api", apiRoutes);

// simple request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// missing route error handler
app.use((req, res) => {
  res.status(404).json({ error: "404 Route Not Found" });
});

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
