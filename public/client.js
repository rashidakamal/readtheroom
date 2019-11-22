// Buttons
let addNewCandidateButton = document.getElementById("addCandidateButton");
let lookupCandidateButton = document.getElementById("lookupCandidateAverageButton");
let lookupCandidateTotalButton = document.getElementById("lookupCandidateTotalButton");


let newUpvoteButton = document.getElementById("upvoteForCandidateButton");
let newDownvoteButton = document.getElementById("downvoteForCandidateButton");



async function getStuff(endpoint) {

    console.log(endpoint);
    const response = await fetch(endpoint);
    const data = await response.text();
    console.log(data);

}

addNewCandidateButton.onclick = function() {

    let candidateName = document.getElementById("addCandidateInput").value;
    console.log(candidateName);
    let updatedEndpoint = 'http://localhost:8080/candidate/new/' + candidateName; 
    getStuff(updatedEndpoint);
}

lookupCandidateButton.onclick = function() {

    let candidateID = document.getElementById("lookupCandidateInput").value;
    let updatedEndpoint = 'http://localhost:8080/candidate/' + candidateID + "/average"; 
    getStuff(updatedEndpoint);
    
}

lookupCandidateTotalButton.onclick = function() {

    let candidateID = document.getElementById("lookupCandidateInput").value;
    let updatedEndpoint = 'http://localhost:8080/candidate/' + candidateID + "/total"; 
    getStuff(updatedEndpoint);
    
}

newUpvoteButton.onclick = function(){

    let candidates = document.getElementById("voteForCandidateInput");
    let getChoice = candidates.options[candidates.selectedIndex].value;

    let updatedEndpoint = 'http://localhost:8080/upvote/' + getChoice + "/"; 
    getStuff(updatedEndpoint);

}

newDownvoteButton.onclick = function(){

    let candidates = document.getElementById("voteForCandidateInput");
    let getChoice = candidates.options[candidates.selectedIndex].value;

    let updatedEndpoint = 'http://localhost:8080/downvote/' + getChoice + "/"; 
    getStuff(updatedEndpoint);

}