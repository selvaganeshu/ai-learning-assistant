import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import flashcardRoutes from "./routes/flashcardRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import quizAttemptRoutes from "./routes/quizAttemptRoutes.js";
import protect from "./middleware/authMiddleware.js";
import chatRoutes from "./routes/chatRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/documents",documentRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/flashcards",flashcardRoutes);
app.use("/api/quizzes",quizRoutes);
app.use("/api/quiz-attempts",quizAttemptRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/activity",activityRoutes);

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