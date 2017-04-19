var express = require('express')
var app = express();
//var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/// files required
Trip = require('./api/models/trip');

/// connect to MongoDB
mongoose.connect('mongodb://localhost/tripapp');
var db = mongoose.connection;

/// implementation
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/', function(req, res) {
  res.send("Please, use /api to list the API's available");
});

app.get('/notes', function(req, res) {
  res.json({notes: "This is your notebook. Edit this to start saving your notes!"})
});

app.get('/api/trips', function(request, response){
  console.log('request GET /api/trips ');
  Trip.getTrips(function(err, trips){
    if (err){
      throw err;
    }
    response.json(trips);
  });
});

app.get('/api/trips/:_id', function(request, response){
  Trip.getTripById(request.params._id, function(err, trip){
    if (err){
      throw err;
    }
    response.json(trip);
  });
});

app.post('/api/trips', function(request, response){
  var trip = request.body;
  Trip.addTrip(trip, function(err, trip){
    if (err){
      throw err;
    }
    response.json(trip);
  });
});

/*
/// example using Postgres
app.post('/trip', function(req, res) {
    const results = [];
    /// grab data from http request
    
    console.log(req.trip_description);
    
    const data = {trip_description: req.body.trip_description};

    pg.connect(connString, (err, client, done) => {
      /// handle connnection errors
      if (err){
        done();
        console.log(err);
        return res.status(500).json({success:false, data:err});
      }
      /// SQL query - insert data
      client.query("INSERT INTO trip (trip_id, trip_description) VALUES (nextval('s_trip'), $1)", [data.trip_description]);
      /// sql query - select data
      const query = client.query("SELECT * FROM trip ORDER BY 1 ASC");
      // stream results back one row at a time;
      query.on('row', (row) => {
        results.push(row);
      });
      // after all data is returned, close the connection and return results
      query.on('end', () => {
        done();
        return res.json(results);
      })  
    });
})
*/

app.listen(3000);
console.log("Running on port 3000...");