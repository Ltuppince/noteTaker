// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs")
var db = require("../db/db.json")

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

// API routes
//=================================================
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});


app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNotes = req.body;

  console.log(newNotes);

  db.push(newNotes);

  fs.writeFile('./db/db.json', JSON.stringify(db), function(err) {
    if (err) throw err;
    console.log("newNotes")
})

});

app.delete("/api/notes/:id", function (req, res) {

})
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});