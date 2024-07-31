// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// Serve static files
app.use(express.static('public'));

// Basic routing
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// First API endpoint
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Handle requests to /api/:date? with date parameter
app.get("/api/:date?", (req, res) => {
  let input = req.params.date;

  // Check if input is empty
  let isEmpty = !input;

  // Check if input is a valid Unix timestamp (integer)
  let isValidUnixNumber = /^[0-9]+$/.test(input);

  // Check if input is a valid date string
  let isValidDate = !isNaN(Date.parse(input));

  // Define variables for output
  let unix_output, utc_output;

  if (isEmpty) {
    // If no date is provided, return the current date
    let currentDate = new Date();
    unix_output = currentDate.getTime();
    utc_output = currentDate.toUTCString();
    return res.json({ unix: unix_output, utc: utc_output });
  } else if (isValidDate) {
    // If the input is a valid date string
    let date = new Date(input);
    unix_output = date.getTime();
    utc_output = date.toUTCString();
    return res.json({ unix: unix_output, utc: utc_output });
  } else if (isValidUnixNumber) {
    // If the input is a valid Unix timestamp
    let date = new Date(parseInt(input));
    unix_output = date.getTime();
    utc_output = date.toUTCString();
    return res.json({ unix: unix_output, utc: utc_output });
  } else {
    // If the input is invalid
    return res.json({ error: "Invalid Date" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
