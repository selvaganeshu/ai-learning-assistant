import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import protect from "./middleware/authMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/documents",documentRoutes);

app.get("/api/protected", protect, (req, res) => {
  res.json({
    success: true,
    data: "This is protected data accessible only to authenticated users.",
    user : req.user
  });
});

app.get("/", (req, res) => {
  res.send("AI Learning Assistant Backend is running.");
});

export default app;