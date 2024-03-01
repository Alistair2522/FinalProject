const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

// Create an Express application
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/Agnethon", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Define a mongoose schema and model for Batata_boys collection
const batataBoysSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  role: String,
  email: String,
  password: String, // Store password as plain text
});

const BatataBoys = mongoose.model("Batata_boys", batataBoysSchema);

// Route to handle signup form submission
app.post("/api/users", async (req, res) => {
  try {
    // Extract data from request body
    const { role, firstName, lastName, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    // Create a new user instance with hashed password
    const newUser = new BatataBoys({
      role,
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store hashed password
    });

    // Save the user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to handle login form submission
app.post("/api/auth", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await BatataBoys.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Authentication successful
    // Check user role and redirect accordingly
    let redirectUrl;
    switch (user.role) {
      case "HOD":
        redirectUrl = "/src/components/Cal/index.js";
        break;
      case "commleader":
        redirectUrl = "/src/components/Cal/index.js";
        break;
      case "student":
        redirectUrl = "/src/components/Cal/index.js";
        break;
      default:
        redirectUrl = "/"; // Default redirect
        break;
    }

    res
      .status(200)
      .json({ message: "Login successful", redirectTo: redirectUrl });
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
