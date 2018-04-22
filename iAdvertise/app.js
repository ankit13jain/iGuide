var net = require('net');
var util = require('util');
var http = require('http');
var fs = require('fs');
var coordinates = require('./utils/coordinates');
// Loading the index file . html displayed to the client

var server = http.createServer(function(req, res) {
	var mime = {
		'/':'text/html',
	    'html': 'text/html',
	    'txt': 'text/plain',
	    'css': 'text/css',
	    'gif': 'image/gif',
	    'jpg': 'image/jpeg',
	    'png': 'image/png',
	    'svg': 'image/svg+xml',
	    'js': 'application/javascript',
	    'ico': 'image/icon'
	};
	const { headers, method, url } = req;
    var splt = url.split(".");
    var extension = splt[splt.length-1];
    filename = url.substr(1,)
    if(url == "/"){
    	filename = 'index.html';
    }
    console.log("hello");
    console.log(extension);
    console.log(mime[extension]);
    fs.readFile(filename, function(error, content) {
        res.writeHead(200, {'Content-Type': mime[extension]});
        res.end(content);
    });
});
// Loading socket.io
var io = require('socket.io').listen(server);

var static_data_to_send = [{
	"id": 3,
	"count": 250,
	"x":100,
	"y":200
},
{
	"id": 3,
	"count": 2000,
	"x":1000,
	"y":200
},
{
	"id": 3,
	"count": 100,
	"x":100,
	"y":500
}]


var collect_flag = false;
var collected_data = [];

// When a client connects, we note it in the console
io.sockets.on('connection', function (socket) {
    // When the server receives a “message” type signal from the client   
    socket.on('message', function (message) {
        console.log('A client is speaking to me! They’re saying: ' + message);
        socket.emit('redirect', '/index_try.html');
    }); 

	// analysis and emit function
	start_collecting().then(function(data) {
		format_data(data, function(data_to_send){
			socket.emit('message', data_to_send);
		});
		collected_data = [];
		// console.log(data); // --> 'done!'
	});
});
server.listen(8000);

function format_data(data,callback){
	counts = {}
	data.forEach(function(i){
		counts[i] = counts[i] ? counts[i] + 1 : 1;
	});
	console.log(counts);
	console.log(data.length);
	data_to_send = []
	for (var j in counts){
		console.log("Haha");
		console.log(coordinates.six_six[j]["x"]);
		console.log(coordinates.six_six[j]["y"]);
		curr = {
			"id" : parseInt(j),
			"count" : counts[j],
			"x" : Math.floor(coordinates.six_six[j]["x"]),
			"y" : Math.floor(coordinates.six_six[j]["y"])
		}
		data_to_send.push(curr);
	}	
	callback(data_to_send);
}

// data collection function
function start_collecting() {
	collect_flag = true;
	var promise = new Promise(function(resolve, reject) {
		setTimeout(function() {
			collect_flag = false;
			resolve(collected_data);
		},3000);
	});
   return promise;
}

// Connecting to eye tribe

connectionOptions = {
	ip: 'tcp://0.tcp.ngrok.io/',
	port: 12658
};


var socket = net.createConnection(12658, '0.tcp.ngrok.io', function(req,res) {
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
				console.log('Malformed JSON');
				// console.error('Malformed JSON', e);
			}
	})


	// Set some values
	socket.write(JSON.stringify({
		category: 'tracker',
		request: 'set',
		values: {push: true}
	}));
});

socket.setEncoding('utf8');

function handleFrameData(data) {
	// console.log(data.avg.x+'\t\t'+data.avg.y);
	var region = get_region(data.avg.x,data.avg.y)
	console.log(region);
	if(collect_flag){
		collected_data.push(region);
	}
	io.sockets.emit('frame', data);
}


function get_region(x,y){
	var max_x = 1300; 
	var max_y = 700;
	// var max_x = 1920;
	// var max_y = 1080;
	var incr_x = max_x/6;
	var incr_y = max_y/6;
	if(x < 0) x = 0;
	if(y < 0) y = 0;
	if(x > max_x) x = max_x;
	if(y > max_y) y = max_y;
	console.log(x+"\t\t"+y);
	// Here 6 is the number of xolumns
	return (Math.floor(y/(incr_y+1))*6)+Math.floor(x/(incr_x+1))+1;
}
