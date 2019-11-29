/*

	Express.js GET/POST example
	Shows how to get the parameters of a GET vs a POST request
	in Express.js 4.0

	created 10 Feb 2015
  	modified 4 Feb 2018
	by Tom Igoe

	modified again by Rashida Kamal
	17 Nov 2019

*/

let allCandidates = [];  // this will become a list of lists! 
let canNames = [];

let voters = []; 

const express = require('express');			    // include express.js
const server = express();						        // a local instance of it
const bodyParser = require('body-parser');	// include body-parser

server.use('/',express.static('public')); // serve static files from /public

// you need a couple of parsers for the body of a POST request:
server.use(bodyParser.json()); 						  // for  application/json
server.use(bodyParser.urlencoded({extended: false})); // for application/x-www-form-urlencoded

// this runs after the server successfully starts:
function serverStart() {
  let port = this.address().port;
  console.log('Server listening on port '+ port);
}

function defaultContent(request, response){

	let content = "This is the default content.";

	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	response.send(content);
	response.end();

}

function newCandidate(request, response){

	let candidateName = request.params.name;

	let defaultList = []; 
	
	allCandidates.push(defaultList); // adding a default value to the end of our candidates array
	canNames.push(candidateName);
	let candidateID = allCandidates.length - 1;

	let content = "You have added " + candidateName + " as a candidate. Their ID is " + candidateID + ".\n";

	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	response.json({Name: candidateName, ID: candidateID})
	response.end();

}

function newVoter(request, response){

	let voterID = request.params.UUID;
	// let voterAgent = request.headers.user-agent;

	let voter = {UUID: voterID, userAgent: voterAgent};
	
	voters.push(voter);

	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	let content = "Voter ID " + UUID + "has been added to the system.";
	response.send(content);
	response.end();

}

// function vote(request, response) {

// 	let candidateID = request.params.num;
// 	let newRating = parseInt(request.params.vote); 

// 		// need to implement some logic to ensure that ratings are not below 0 or above 5

// 	currentCandidateRatings = allCandidates[candidateID]; 

// 	let newVote = {id: candidateID, name: canNames[candidateID], time: Date.now(), rating: newRating};
// 	currentCandidateRatings.push(newVote);
// 	response.header("Access-Control-Allow-Origin", "*");
//   	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

// 	// edit this so we're returning json, not messages. 
// 	let content = "Vote submitted.";
// 	// response.send(content);
// 	response.json({id: candidateID, Name: canNames[candidateID], Time: Date.now(), Rating: newRating});
// 	response.end();

// }

function upvote(request, response) {

	let candidateID = request.params.canID;
	let voterID = request.params.UUID;

	currentCandidateRatings = allCandidates[candidateID]; 

	let newVote = {id: candidateID, name: canNames[candidateID], time: Date.now(), rating: 1, voter: voterID};
	currentCandidateRatings.push(newVote);

	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	// response.json({id: candidateID, name: canNames[candidateID], time: Date.now(), rating: 1});
	response.send(voter_info);
	response.end();

}

function downvote(request, response) {

	let candidateID = request.params.canID;
	let voterID = request.params.UUID;

	currentCandidateRatings = allCandidates[candidateID]; 

	let newVote = {id: candidateID, name: canNames[candidateID], time: Date.now(), rating: -1, voter: voterID};
	currentCandidateRatings.push(newVote);

	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	// response.json({id: candidateID, name: canNames[candidateID], time: Date.now(), rating: -1});
	response.send(voter_info);
	response.end();

}


function lookupCandidates(request, response){

	let content = canNames; 
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  
	response.json({candidates: content});
	response.end();

}

function lookupVotes(request, response){

	let content = allCandidates; 
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  
	response.send(content);
	response.end();

}

// implement overall vote total ... 
function voteTotals(request, response){

	let content = allCandidates; 
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  
	response.send(content);
	response.end();

}

function lookupVotesByCandidate(request, response){

	let canID = request.params.num; 
	let content = allCandidates[canID];

	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  
	response.send(content);
	response.end();
}

function candidateAverageRating(request, response){

	let candidateID = request.params.num;

	let currentCandidateRatings = allCandidates[candidateID]; // this is a list! 

	let sumRatings = []; 

		for (i=0; i < currentCandidateRatings.length; i++) {

			let iRating = currentCandidateRatings[i].rating; 
			sumRatings.push(iRating);

		}
	let averageRating = sumRatings.reduce((a,b) => a + b, 0) / currentCandidateRatings.length; 

	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	let content = averageRating.toString();
	// response.send(content);
	response.json({id: candidateID, name: canNames[candidateID], Average: content})
	response.end();

}

function candidateTotalRating(request, response){

	let candidateID = request.params.num;

	let currentCandidateRatings = allCandidates[candidateID]; // this is a list! 

	let sumRatings = []; 

		for (i=0; i < currentCandidateRatings.length; i++) {

			let iRating = currentCandidateRatings[i].rating; 
			sumRatings.push(iRating);

		}
	let totalRating = sumRatings.reduce((a,b) => a + b, 0);

	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	response.json({id: candidateID, name: canNames[candidateID], total: totalRating})
	response.end();

}

const PORT = process.env.PORT || 3000;
// const PORT = 8080;

server.listen(PORT, serverStart);

server.get('/', defaultContent);
server.get('/default', defaultContent); 
server.get('/candidate/new/:name', newCandidate); // returns candidate ID #

server.get('/voter/new/:UUID', newVoter); 


server.get('/:UUID/upvote/:canID/', upvote);
server.get('/:UUID/downvote/:canID/', downvote);

server.get('/candidate/all/', lookupCandidates); 
server.get('/votes/all/', lookupVotes); 

server.get('/candidate/:num/allvotes', lookupVotesByCandidate); // returns all votes for a given candidate
// server.get('/candidate/:num/vote/:vote', vote); // submits new rating/vote, 1-5 "stars" or "points" or w/e

server.get('/candidate/:num/average', candidateAverageRating); // returns average votes for a given candidate
server.get('/candidate/:num/total', candidateTotalRating); // return total of up & downvotes for a given candidate

