//Manage logic to the Stations entity
var mongoose = require('mongoose');
var Station  = mongoose.model('Station');

//Retrieve all available stations in DB
exports.findAllStations = function(req, res) {
	Station.find().sort('_id').exec(function(err, stations) {
    	if(err) res.send(500, err.message);

			res.status(200).jsonp(stations);
	});
};

//Retrieve an existing Station by a given ID
exports.findById = function(req, res) {
	Station.findById(req.params._id).exec(function(err, station) {
	    if(err) return res.send(500, err.message);

			res.status(200).jsonp(station);
	});
};