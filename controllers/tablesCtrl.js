var mongoose = require('mongoose');
var Table  = mongoose.model('Table');
var Station  = mongoose.model('Station');
var auth 		= require('basic-auth');

//Retrieve all available tables in DB
exports.findAllTables = function(req, res) {
	var skip = req.query.skip || null;
	var limit = req.query.limit || null;
	var sort = req.query.sort || "_id";

	delete req.query.skip;
	delete req.query.limit;
	delete req.query.sort;

	var query = req.query;

	if(Array.isArray(query.fromDatetime)){
		query.fromDatetime = {
			$gte : new Date(query.fromDatetime[0]),
			$lt : new Date(query.fromDatetime[1]).addDays(1)
		}
	}
	else if(query.fromDatetime){
		query.fromDatetime = {
			$gte : new Date(query.fromDatetime),
			$lt : new Date(req.query.fromDatetime).addDays(1)
		};
	}

  //Find table and its relations (stations, user). Hide user pass with -password
	Table.find(query)
		.sort(sort)
		.skip(skip)
		.limit(limit)
		.populate('_fromStation')
		.populate('_toStation')
		.populate('_user', '-password')
		.exec(function(err, tables) {
		    if(err) res.send(500, err.message);

			  res.status(200).jsonp(tables);
	});
};

//Retrieve a table by an ID
exports.findById = function(req, res) {
	Table.findById(req.params._id)
	.populate('_fromStation')
	.populate('_toStation')
	.populate('_user', '-password')
	.exec(function(err, table) {
	    if(err) return res.send(500, err.message);

		  return res.status(200).jsonp(table);
	});
};

//Create new table
exports.addTable = function(req, res) {
	var table = new Table({
		_fromStation: 		req.body._fromStation || null,
		_toStation: 		req.body._toStation || null,
		fromDatetime: 		req.body.fromDatetime || null,
		toDatetime: 		req.body.toDatetime || null,
		availablePlaces: 	req.body.availablePlaces || 3,
		_user: 				req.body._user || null
	});

	table.save(function(err, table) {
		if(err) return res.send(500, err.message);

    res.status(200).jsonp(table);
	});
};

//Update an existing table only if belongs to the user
exports.updateTable = function(req, res) {
	var user = auth(req);

	isTableOfUser(user.name, req.params._id, function(result){
		if(!result) return res.send(403, 'Forbidden');

		Table.findById(req.params._id, function(err, table) {
			table._fromStation 		= req.body._fromStation ? req.body._fromStation : table._fromStation;
			table._toStation 		= req.body._toStation ? req.body._toStation : table._toStation;
			table.fromDatetime 		= req.body.fromDatetime ? req.body.fromDatetime : table.fromDatetime;
			table.toDatetime 		= req.body.toDatetime ? req.body.toDatetime : table.toDatetime;
			table.availablePlaces 	= req.body.availablePlaces ? req.body.availablePlaces : table.availablePlaces;
			table._user 			= req.body._user ? req.body._user : table._user;

			table.save(function(err) {
				if(err) return res.send(500, err.message);

	      return res.status(200).jsonp(table);
			});
		});
	})
};

//Delete an existing table only if belongs to the user
exports.deleteTable = function(req, res) {
	var user = auth(req);

	isTableOfUser(user.name, req.params._id, function(result){

		if(!result) return res.send(403, 'Forbidden');

		Table.findById(req.params._id, function(err, table) {

			table.remove(function(err) {
				if(err) return res.send(500, err.message);

	      return res.send(200);
			});
		});
	})
};

//Check if existing table belongs to the user
function isTableOfUser(email, tableId, callback){
	var result = true;

	Table.find({_id: tableId}).populate('_user').lean().exec(function(err, tables) {
		if(err || tables.length == 0 || tables[0]._user.email != email) result = false;

	  callback(result);
	});
}

//Add days to a given date
Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};