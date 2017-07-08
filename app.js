var express         = require("express"),
    cors            = require('cors'),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    auth            = require('basic-auth'),
    fs              = require('fs'),
    multer          = require('multer');

// Connection to DB
//mongoose.connect('mongodb://localhost/MesasAVE', function(err, res) {
mongoose.connect('mongodb://mesasave:enriqueyjonathan@ds033107.mongolab.com:33107/mesasave', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
//app.use(multer({ dest: '/Users/jonathanmartinez/Desktop'}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var stationsModel = require('./models/stationsModel')(app, mongoose);
var stationsCtrl = require('./controllers/stationsCtrl');

var tablesModel = require('./models/tablesModel')(app, mongoose);
var tablesCtrl = require('./controllers/tablesCtrl');

var usersModel = require('./models/usersModel')(app, mongoose);
var usersCtrl = require('./controllers/usersCtrl');

var router = express.Router();

app.get('/', function(req, res) {
  res.send(200, 'Hello worldful!');
});

router.get('/', function(req, res) {
  res.send(200, 'Hello worldful!');
});

// API routes
router.route('/stations')
  .get(stationsCtrl.findAllStations);
router.route('/stations/:_id')
  .get(stationsCtrl.findById);

router.route('/tables')
  .get(tablesCtrl.findAllTables)
  .post(usersCtrl.requiresLogin, tablesCtrl.addTable);
router.route('/tables/:_id')
  .get(tablesCtrl.findById)
  .put(usersCtrl.requiresLogin, tablesCtrl.updateTable)
  .delete(usersCtrl.requiresLogin, tablesCtrl.deleteTable);

router.route('/users')
  .get(usersCtrl.findAllUsers)
  .post(usersCtrl.addUser);
router.route('/users/rememberPassword')
  .post(usersCtrl.rememberPassword);
router.route('/users/:_id')
  .get(usersCtrl.findById)
  .put(usersCtrl.requiresLogin, usersCtrl.updateUser);
  //.delete(usersCtrl.deleteUser);
router.route('/users/login')
  .post(usersCtrl.login);

app.use('/api/v1/', router);

app.set('port', (process.env.PORT || 5000));

// Start server
app.listen(app.get('port'), function() {
  console.log("NodeJS server running on http://localhost:" + app.get('port'));
});
