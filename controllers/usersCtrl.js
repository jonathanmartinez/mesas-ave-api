//Manage logic to the Users entity
var mongoose 	= require('mongoose');
var Table  		= mongoose.model('Table');
var User  		= mongoose.model('User');
var nodemailer 	= require('nodemailer');
var auth 		= require('basic-auth');

//Create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mesasave@gmail.com',
        pass: 'enriqueyjonathan'
    }
});


//Retrieve all available users on DB
exports.findAllUsers = function(req, res) {
	User.find(req.query, {'password': 0}).sort('_id').exec(function(err, users) {
	    if(err) res.send(500, err.message);

		res.status(200).jsonp(users);
	});
};

//Retrieve an existing users by a given ID
exports.findById = function(req, res) {
	User.findById(req.params._id).exec(function(err, user) {
	    if(err) return res.send(500, err.message);

		var tablesOfUser = [];
		Table.find({ '_user':  req.params._id}, {'_user': 0})
			.exec( function (err, tables) {
		  		if(err) return res.send(500, err.message);

		  		tablesOfUser = tables;
		  		//user is inmutable. I need to use toObject for convert it into mutable
		  		user = user.toObject();
				  user.tables = tablesOfUser;
				  //hide password
				  delete user.password;

				  res.status(200).jsonp(user);
			});
	});
};

//Creates a new user
exports.addUser = function(req, res) {
	//validate input
	if(!req.body.name || !req.body.email || !req.body.password || !req.body.phone){
		return res.send(500, "Error: Falta algún parametro");
	}
	else{
		//validate if email does not exist
		User.find({'email': req.body.email}).lean().exec(function(err, users) {
			if(err || users.length > 0){
				res.send(403, "Email already taken");
			}
			else{
				var user = new User({
					name: 		req.body.name,
					email: 		req.body.email,
					password: 	req.body.password,
					phone: 		req.body.phone,
				});

				user.save(function(err, user) {
					if(err) return res.send(500, err.message);

			    res.status(200).jsonp(user);
				});
			}
		});
	}
};

//Updates an existing user in DB
exports.updateUser = function(req, res) {
	var user = auth(req);

	isUser(user.name, req.params._id, function(result){
		if(!result) res.send(403, 'Forbidden');

		User.findById(req.params._id, function(err, user) {
			user.name 		= req.body.name ? req.body.name : user.name;
			user.phone 		= req.body.phone ? req.body.phone : user.phone;

			var userObj = user.toObject();
			//hide password if password not matches
			delete userObj.password;

			//try to change password
			if(req.body.password && req.body.password == user.password && req.body.newPassword && req.body.repeatNewPassword && req.body.newPassword == req.body.repeatNewPassword){
				user.password = req.body.newPassword;
				//now add password to response
				userObj.password = req.body.newPassword;
			}

			user.save(function(err) {
				if(err) return res.send(500, err.message);

	      res.status(200).jsonp(userObj);
			});
		});
	});
};

//Sends an email to remember your password
exports.rememberPassword = function(req, res) {
	User.find({'email': req.body.email}).lean().exec(function(err, users) {
		if(err || users.length == 0) res.send(500, err.message);

		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: 'Mesas AVE App <mesasave@gmail.com>', // sender address
		    to: req.body.email, // list of receivers
		    subject: 'Recuperar contraseña', // subject line
		    text: 'Tu contraseña es: ' + users[0].password, // plaintext body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        res.send(500, error);
		    }else{
		        res.send(200, 'Message sent: ' + info.response);
		    }
		});
	});

};

//Do the login
exports.login = function(req, res) {
	var user = auth(req);

	authorize(user.name, user.pass, function(result){
		if(!result) return res.send(401, 'Unauthorized');

		return res.status(200).jsonp(result);
	});
};

//Check credentials to do the login
function authorize(email, password, callback) {
	var result;
	User.find({'email': email, 'password': password}).lean().exec(function(err, users) {
	    if(err || users.length == 0) result = false;
	    else result = users[0];

	    callback(result);
	});
}

//Check if user exists
function isUser(authEmail, userId, callback) {
	var result = true;

	User.find({_id: userId, email: authEmail}).lean().exec(function(err, users) {
		if(err || users.length == 0) result = false;

	    callback(result);
	});
}

//Check users credentials
exports.requiresLogin = function(req, res, next) {
	var user  = auth(req);

	User.find({email: user.name, password: user.pass}).lean().exec(function(err, users) {
		if(err || users.length == 0) return res.send(401, 'Unauthorized');

		next();
	});
};