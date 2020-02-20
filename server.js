var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();


var PORT = process.env.PORT || 8080;


app.use(express.urlencoded({extended:true}));
app.use(express.json());



var noteData = require("./db/db.json");


app.use(express.static("public"));


app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});


app.get("/api/notes" , function(req, res) {
  return res.json(noteData);
});


app.post("/api/notes", function(req,res) {
  var newNote = req.body;
  let maxID = 0;
  for(const note of noteData) {
    let currentID = note.id;
    if (currentID > maxID) {
      maxID = currentID;
    }
  }
  newNote.id = maxID + 1;
  let tempNoteData = noteData;
  tempNoteData.push(newNote);
  fs.writeFile("db/db.json", JSON.stringify(tempNoteData), err => {
    if(err){
      console.log(err);
    } else {
      console.log("Added new note");
      console.log(noteData)
      res.json(newNote);
    }
  });
});


app.delete("/api/notes/:id", function(req, res) {
  var chosenID = req.params.id;
  let tempDB = noteData;
  for (let i = 0; i < tempDB.length; i++) {
    if (chosenID === tempDB[i].id.toString()) {
      tempDB.splice(i, 1);
    }
  }
  fs.writeFile("./db/db.json", JSON.stringify(tempDB), err => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log(`Deleted id # ${chosenID} from the database.`);
      console.log(noteData);
      res.sendStatus(200);
    }
  });
});



app.listen(PORT, function() {
  console.log("SERVER IS LISTENING: " + PORT);
});