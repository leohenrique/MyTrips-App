var mongoose = require('mongoose');

/// Trip Schema
var tripSchema = mongoose.Schema({
    name: {
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
    Trip.create(trip, callback);
}