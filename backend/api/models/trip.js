var mongoose = require('mongoose');

/// Trip Schema
var tripSchema = mongoose.Schema({
    trip_description: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Trip = module.exports = mongoose.model('Trip', tripSchema);

/// Get trips
module.exports.getTrips = function(callback, limit){
    Trip.find(callback).limit(limit);
}

/// Get trip by ID
module.exports.getTripById = function(id, callback, limit){
    Trip.findById(id, callback);
}

/// Add Trip
module.exports.addTrip = function(trip, callback){
    console.log('trip.js - addTrip');
    Trip.create(trip, callback);
}

/// Update Trip
module.exports.updateTrip = function(id, trip, options, callback){
    console.log('trip.js - updateTrip');

    var query = {_id: id};
    var update = {
        trip_description: trip.trip_description
    }
    Trip.findOneAndUpdate(query, update, options, callback);
}


/// Delete Trip
module.exports.deleteTrip = function(id, trip, callback){
    console.log('trip.js - deleteTrip');
    var query = {_id: id};
    Trip.remove(query, callback);
}