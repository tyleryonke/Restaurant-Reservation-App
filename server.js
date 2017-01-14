// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Reservation DATA
// =============================================================
var tables = [];
var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Basic route that sends the user to the page for making reservations.
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Basic route that sends the user to the page for looking at current reservations.
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Route to send current data (as JSON) on reserved and waitlisted parties.

app.get("/tabledata", function(req, res) {
  res.send(
    JSON.stringify({
      tables: tables,
      waitlist: waitlist
    })
  )
  res.end();
})

// Creates new table reservations.
app.post("/api/new", function(req, res) {
  var newtable = req.body;
  newtable.routeName = newtable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newtable);

  if (tables.length>4) {
    waitlist.push(newtable);
  }
  else {
    tables.push(newtable);
  }

  res.json(newtable);
});

// Starts the server to begin listening.
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
