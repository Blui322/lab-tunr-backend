const express = require("express");
const cors = require("cors");

const app = express();

const songController = require("./controllers/songController.js");
// const reviewsController = require('./controllers/reviewsController.js')


app.use(cors());
app.use(express.json());

app.use("/songs", songController);
// app.use('/api/reviews', reviewsController)

// ROUTES
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Tuner App");
});




// 404 PAGE
app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});// Middleware for global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Send back a generic error response
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong. Please try again later.",
  });
});

// Route-specific error handling
app.post("/songs", async (req, res) => {
  try {
    // Code to handle the POST request
    // ...
    res.status(200).json({ message: "Song created successfully" });
  } catch (error) {
    // Handle specific errors
    if (error.code === "23505") { // Unique constraint violation
      res.status(400).json({ error: "Song already exists", message: "A song with the same name already exists." });
    } else {
      // For other errors, send a generic error response
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", message: "Something went wrong. Please try again later." });
    }
  }
});



// EXPORT
module.exports = app;