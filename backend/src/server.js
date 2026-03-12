import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import {serve} from "inngest/express" // for inngest server;

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,extended:true}));
// extended:true => server allows a browser to include cookies on reuquest

app.use('/api/inngest',serve({client: inngest, functions}))


app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

// serve frontend
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () =>
      console.log("Server is running on port:", ENV.PORT)
    );
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();