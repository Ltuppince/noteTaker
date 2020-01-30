// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Routes
// =============================================================

// * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function(req, res) {
    
  res.sendFile(path.join(__dirname, "notes.html"));
});

//* GET `*` - Should return the `index.html` file
app.get("*", function(req, res) {
    
  res.sendFile(path.join(__dirname, "index.html"));
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
