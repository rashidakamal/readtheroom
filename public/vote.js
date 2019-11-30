const UUID = (Math.floor(Math.random() * 1000)); 
console.log(UUID);

let test = "testVoter"
let newUpvoteButton = document.getElementById("upvoteForCandidateButton");
let newDownvoteButton = document.getElementById("downvoteForCandidateButton");

async function getStuff(endpoint) {

    console.log("in getStuff");
    console.log(endpoint);
    const response = await fetch(endpoint);
    const data = await response.text();
    console.log(data);

}

let voterEndpoint = 'https://debate-room.herokuapp.com/voter/new/' + UUID; 
getStuff(voterEndpoint);

newUpvoteButton.onclick = function(e){

    let getChoice = e.target.parentNode.id; 
    // let candidates = document.getElementById("voteForCandidateInput");
    console.log(e.target.parentNode);

    let updatedEndpoint = 'https://debate-room.herokuapp.com/' + UUID + '/upvote/' + getChoice + "/"; 
    getStuff(updatedEndpoint);

}

newDownvoteButton.onclick = function(e){

    let getChoice = e.target.parentNode.id; 
    // let candidates = document.getElementById("voteForCandidateInput");
    console.log(e.target.parentNode);


    let updatedEndpoint = 'https://debate-room.herokuapp.com/'+ UUID +'/downvote/' + getChoice + "/"; 
    getStuff(updatedEndpoint);

}