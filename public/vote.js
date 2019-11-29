const UUID = (Math.floor(Math.random() * 1000)); 
console.log(UUID);

let newUpvoteButton = document.getElementById("upvoteForCandidateButton");
let newDownvoteButton = document.getElementById("downvoteForCandidateButton");

async function getStuff(endpoint) {

    console.log(endpoint);
    const response = await fetch(endpoint);
    const data = await response.text();
    console.log(data);

}

let voterEndpoint = 'https://debate-room.herokuapp.com/voter/new/' + UUID; 
getStuff(voterEndpoint);

newUpvoteButton.onclick = function(){

    let candidates = document.getElementById("voteForCandidateInput");
    let getChoice = candidates.options[candidates.selectedIndex].value;

    console.log(UUID);
    let updatedEndpoint = 'https://debate-room.herokuapp.com/' + UUID + '/upvote/' + getChoice + "/"; 
    getStuff(updatedEndpoint);

}

newDownvoteButton.onclick = function(){

    let candidates = document.getElementById("voteForCandidateInput");
    let getChoice = candidates.options[candidates.selectedIndex].value;
    console.log(UUID); 
    let updatedEndpoint = 'https://debate-room.herokuapp.com/'+ UUID +'/downvote/' + getChoice + "/"; 
    getStuff(updatedEndpoint);

}