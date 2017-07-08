exports = module.exports = function(app, mongoose) {

	var userSchema = new mongoose.Schema({
		name: 		{ type: String },
		email: 		{ type: String },
		phone: 		{ type: String },
		password: 	{ type: String },
		imageURL: 	{ type: String }
	});

	mongoose.model('User', userSchema);
};