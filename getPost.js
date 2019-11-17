/*

	Express.js GET/POST example
	Shows how to get the parameters of a GET vs a POST request
	in Express.js 4.0

	created 10 Feb 2015
  	modified 4 Feb 2018
	by Tom Igoe

*/

var allCandidates = [];  // this will become a list of lists! 
var voters = []; 

var express = require('express');			    // include express.js
var server = express();						        // a local instance of it
var bodyParser = require('body-parser');	// include body-parser

server.use('/',express.static('public')); // serve static files from /public

// you need a couple of parsers for the body of a POST request:
server.use(bodyParser.json()); 						  // for  application/json
server.use(bodyParser.urlencoded({extended: false})); // for application/x-www-form-urlencoded

// this runs after the server successfully starts:
function serverStart() {
  var port = this.address().port;
  console.log('Server listening on port '+ port);
}

// this is called by both GET and POST handlers,
// to format a response to the request:
function formatResponse(thisContent) {
	var result = 'I will say:' + '\n' + thisContent.name;
  	return result;
}


function newCandidate(request, response){

	console.log("in newCandidate");
	var defaultList = [5]; 
	allCandidates.push(defaultList); // adding a default value to the end of our candidates array
	var candidateID = allCandidates.length - 1;

	// RK Idea: if we add a "name" parameter, then we can parrot back the added name to the client. 

	var content = 'You added a new candidate to the sentiment meter. Their candidate ID is: ' + candidateID + '\n';
	response.end(content);

}

function candidateRating(request, response){
	// current average of all submitted votes


}


function vote(request, response) {

	var candidateID = request.params.num;
	var newRating = request.params.vote; 

	// allCandidates[candidateID] = newRating; // replaces value at this index; 
	console.log(request.headers);

}

function candidateHistory(request, response) {
	// return json with timestamps & ratings
}

// start the server:
server.listen(8080, serverStart);

// we can use the request headers to uniquely track each voter 
// but also do we want that kind of life? 
// so that they can submit votes simply by hitting up /candidate/:num/:vote

server.get('/candidate/new/', newCandidate); // returns candidate ID #
server.get('/candidate/:num/:', candidateRating); // returns current rating of candidate
server.get('/candidate/:num/:vote', vote); // submits new rating/vote, 1-5 "stars" or "points" or w/e
server.get('/candidate/:num/history', candidateHistory); 

// // we can use the request headers to uniquely track each voter... 
// server.get('/voter/new/', newVoter); // adds a new number, returns voter ID #
// server.get('/voter/:num/', voterRating); // get current voter rating
// server.get('/voter/:num/history', voterHistory); // returns voter rating history
