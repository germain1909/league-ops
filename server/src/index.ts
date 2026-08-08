import cors from "cors";
import express from "express";

import healthRoutes from "./routes/health.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);

app.listen(3001);

//When the request gets inside healthRouter, 
//Express has already matched /health.
// So the router only sees the remaining path.