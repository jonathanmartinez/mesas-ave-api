exports = module.exports = function(app, mongoose) {

	var stationSchema = new mongoose.Schema({
		name: { type: String }
	});

	mongoose.model('Station', stationSchema);

};
