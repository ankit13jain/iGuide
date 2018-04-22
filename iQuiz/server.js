const express = require('express');
const app = express();
var session = require('express-session');
var server= require('http').Server(app);
var io = require('socket.io')(server);
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var net = require('net');
var QuizController = require('./controllers/QuizController');

server.listen(3000);
console.log('Server Listening on port 3000');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://visionuser:visionuser123@ds135619.mlab.com:35619/vision');

const QuestionRouter = require('./routes/QuestionRouter');

app.use(express.static('public'));
app.set('view engine', 'ejs');

// Session related for tracking logins
app.use(session({
  secret: 'PackHacks',
  resave: true,
  saveUninitialized: false,
  // store: new MongoStore({
  //   url: 'mongodb://localhost:27017/'
  // })
}));


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/question', QuestionRouter);
app.post('/recordSelectedOption1', QuizController.selectedOption1);
app.post('/recordSelectedOption2', QuizController.selectedOption2);
app.post('/recordSelectedOption3', QuizController.selectedOption3);
app.get('/', function (req, res) {
   res.sendFile(__dirname + '/index.html');
});

// socket
var collected_data = [];
var index=0;
var isConfirmation = false;
var isStartQuiz = false;
var time_out = 600;
var isAnswering = false;
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('Question_Reading_Starts', function(){
  	console.log('question reading started');
  	collected_data = [];
  	index=0;
  	isAnswering = true;
  });
  socket.on('Confirmation_Starts',function(){
  	console.log('question reading started');
  	collected_data = [];
  	index=0;
  	isConfirmation = true;
  });
  socket.on('start_quiz',function(){
  	console.log('start_quiz');
  	collected_data = [];
  	index=0;
  	isStartQuiz = true;
  });
});

// Connecting to eye tribe

connectionOptions = {
	ip: 'tcp://0.tcp.ngrok.io/',
	port: 12571
};


var socket = net.createConnection(12571, '0.tcp.ngrok.io', function(req,res) {
	setInterval(function() {
		socket.write(JSON.stringify({
		    "category": "heartbeat"
		}));
	}, 2000);


	console.log('Socket on port '+connectionOptions.port+' (TheEyeTribe server) connected');

	socket.on('error', function(data) {
		console.log('TheEyeTribe error', data);
	})
	socket.on('close', function(data) {
		console.log('TheEyeTribe close');
	})
	socket.on('data', function(data) {
			try {
				data = JSON.parse(data);
				if(data.values && data.values.frame) {
					handleFrameData(data.values.frame);
				}
			} catch(e) {
				//console.error('Malformed JSON', e);
			}
	})

	socket.write(JSON.stringify({
		category: 'tracker',
		request: 'set',
		values: {push: true}
	}));
});

socket.setEncoding('utf8');

function handleFrameData(data) {

	var region = get_region(data.avg.x,data.avg.y)
	if(region!=0)
		collected_data.splice(index%time_out, 1, region);
	//console.log(collected_data.length);
	index=index+1;
	const collected_set = new Set(collected_data);
	console.log('region',region);
	//console.log('set size',collected_set.size);
	if([3,4,5,6].includes(collected_data[0])){
		io.sockets.emit('regions', region-2);
		if(collected_data.length==time_out && collected_set.size==1){
			if(isConfirmation == true){
				console.log('confirmation ends',collected_data[0]);
				isConfirmation = false;
	  			io.sockets.emit('confirmation_ends', collected_data[0]);
			}
			else if(isStartQuiz == true){
				console.log('quiz starts',collected_data[0]);
				isStartQuiz = false;
				collected_data = [];
	  			index=0;
	  			io.sockets.emit('quiz_started', collected_data[0]);
			}
			else if(isAnswering == true){
				var selected_option = collected_data[0]-2;
	  			console.log('user selected',selected_option);
	  			isAnswering = false;
	  			io.sockets.emit('selected_option', selected_option);
	  		}
		}
	}
}


function get_region(x,y){
	var max_x = 1300;
	var max_y = 700;
	// var max_x = 1920;
	// var max_y = 1080;
	var incr_x = max_x/2;
	var incr_y = max_y/3;
	if(x==0 && y==0)
		return 0;
	if(x < 0) x = 0;
	if(y < 0) y = 0;
	if(x > max_x) x = max_x;
	if(y > max_y) y = max_y;
	//console.log(x+"\t\t"+y);
	return (Math.floor(y/(incr_y+1))*2)+Math.floor(x/(incr_x+1))+1;
}
