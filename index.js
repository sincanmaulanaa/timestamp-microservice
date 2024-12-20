// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api', function (req, res) {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  })
})

app.get('/api/:date', (req, res) => {
  const { date } = req.params;

  // Check if date is a valid timestamp or date string
  let timestamp;

  if (/^\d+$/.test(date)) {
    // If the date is a numeric string, treat it as a timestamp
    timestamp = parseInt(date);
  } else {
    // Treat it as a date string and parse it
    timestamp = Date.parse(date);
  }

  if (isNaN(timestamp)) {
    // If the timestamp is invalid, respond with an error
    return res.status(400).json({ error: 'Invalid Date' });
  }

  // Create a Date object from the timestamp
  const parsedDate = new Date(timestamp);

  // Send the response with both unix and utc formats
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
