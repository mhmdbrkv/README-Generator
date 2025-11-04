const express = require("express");
const mountRoutes = require("./routes");
const { ai, currentModel } = require("./utils/gemini");
const { PORT } = require("./config");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));

// Test Gemini connection and Check connection on server start
(async (ai) => {
  try {
    const response = await ai.models.generateContent({
      model: currentModel,
      contents: "Say 'OK' in one word.",
    });
    console.log(`✅ Gemini connected: ${response.text}`);
    return true;
  } catch (error) {
    console.error("❌ Gemini connection failed:", error.message);
    return false;
  }
})(ai);

// Mount routes
mountRoutes(app);

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🤖 Using Gemini model: ${currentModel}`);
});

process.on("SIGINT", () => {
  console.log("\n🛑 Server shutting down gracefully");
  process.exit(0);
});
