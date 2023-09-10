const express = require("express");
const router = express.Router();

// GET request: Retrieve all users
router.get("/", (req, res) => {
  //console.log(users);
  res.send("You are not allowed to see the list"); //This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented"); //This line is to be replaced with actual return value
});

// POST request: Create a new user

// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented"); //This line is to be replaced with actual return value
});

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented"); //This line is to be replaced with actual return value
});

module.exports = router;
