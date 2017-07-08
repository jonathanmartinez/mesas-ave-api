exports = module.exports = function(app, mongoose) {

	var tableSchema = new mongoose.Schema({
		_fromStation: 		{ type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
		_toStation: 		{ type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
		fromDatetime: 		{ type: Date },
		toDatetime: 		{ type: Date },
		availablePlaces: 	{ type: Number },
		price: 				{ type: Number },
		category: 			{ type: String, enum: ['Turista', 'Turista Plus', 'Preferente'] },
		_user: 				{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
	});

	mongoose.model('Table', tableSchema);

};
