// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Handle requests to /api/ with no date parameter (current date)
app.get('/api/', (req, res) => {
  const currentDate = new Date();
  const currentDateUNIX = currentDate.getTime();
  const currentDateUTC = currentDate.toUTCString();
  res.json({ unix: currentDateUNIX, utc: currentDateUTC });
});

// Handle requests to /api/:date with a Unix timestamp or date string
app.get('/api/:date', (req, res) => {
  const dateParam = req.params.date;
  let date;

  // Check if the dateParam is a valid Unix timestamp
  if (!isNaN(parseInt(dateParam))) {
    date = new Date(parseInt(dateParam));
  } else {
    // Check if dateParam is a valid date string
    date = new Date(dateParam);
  }

  // Validate date
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    const unix = date.getTime();
    const utc = date.toUTCString();
    res.json({ unix, utc });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
