const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 9000;

// MongoDB connection setup
const url =
  "mongodb+srv://janjuasoban71:z9Il8J6cZU76nXac@cluster0.s4ghkov.mongodb.net/yourDatabaseName?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Mongoose model for the contact form
const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  subject: String,
  message: String,
});

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS setup
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Endpoint to handle form submission
app.post("/submit-form", (req, res) => {
  const { name, email, subject, message } = req.body;

  const contact = new Contact({
    name,
    email,
    subject,
    message,
  });

  contact
    .save()
    .then(() => res.status(200).send("Form submitted successfully!"))
    .catch((err) => {
      console.error("Error saving contact form:", err);
      res.status(500).send("Error submitting form. Please try again later.");
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
