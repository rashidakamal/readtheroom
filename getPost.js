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

function newCandidate(request, response){

	console.log("I got a GET request");
	var candidateName = request.params.name;

	// console.log("in newCandidate");
	var defaultList = []; 
	
	allCandidates.push(defaultList); // adding a default value to the end of our candidates array
	var candidateID = allCandidates.length - 1;
	console.log(allCandidates);

	var content = "You have added " + candidateName + " as a candidate. Their ID is " + candidateID + ".\n";

	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	response.send(content);
	response.end();

}

function candidateRating(request, response){

	var candidateID = request.params.num;

	var currentCandidateRatings = allCandidates[candidateID]; // this is a list! 

	var sumRatings = []; 

		for (i=0; i < currentCandidateRatings.length; i++) {

			var iRating = currentCandidateRatings[i].rating; 
			sumRatings.push(iRating);
			console.log(iRating); 

		}
	var averageRating = sumRatings.reduce((a,b) => a + b, 0) / currentCandidateRatings.length; 

	console.log("Current average rating for candidate: " + candidateID + " is ");
	console.log(currentCandidateRatings); 
	console.log(averageRating); 

	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	var content = "printing average rating to log";
	response.send(content);
	response.end();

}


function vote(request, response) {

	var candidateID = request.params.num;
	var newRating = parseInt(request.params.vote); 

		// need to implement some logic to ensure that ratings are not below 0 or above 5

	currentCandidateRatings = allCandidates[candidateID]; 

	var newVote = {time: Date.now(), rating: newRating};
	currentCandidateRatings.push(newVote);

	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	// edit this so we're returning json, not messages. 
	var content = "trying to vote damnnit";
	response.send(content);
	response.end();

}

function candidateHistory(request, response) {

	// Dear Andrew and Jackie,
	// If you'd like, you can maybe parse our vote objects for ratings and timestamps, and then provide an average of rating for a given duration of time
	// Ya know, some sort of candidate history...
	// Chart?
	// Json?

	// much love,
	// Anna, Rashida, & SJ

}

function defaultContent(request, response){

	var content = "This is the default content.";

	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	response.send(content);
	response.end();

}
// start the server:
server.listen(8080, serverStart);

server.get('/default', defaultContent); // returns candidate ID #

server.get('/candidate/new/:name', newCandidate); // returns candidate ID #
server.get('/candidate/:num/', candidateRating); // returns current rating of candidate
server.get('/candidate/:num/vote/:vote', vote); // submits new rating/vote, 1-5 "stars" or "points" or w/e
// server.get('/candidate/:num/history', candidateHistory); 