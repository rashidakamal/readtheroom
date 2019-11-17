// Buttons
let addNewCandidateButton = document.getElementById("addCandidateButton");
let lookupCandidateButton = document.getElementById("lookupCandidateButton");
let newVoteButton = document.getElementById("voteForCandidateButton");


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

    let updatedEndpoint = 'http://localhost:8080/candidate/' + candidateID + "/"; 
    getStuff(updatedEndpoint);
    
}

newVoteButton.onclick = function(){

    let candidateID = document.getElementById("voteForCandidateInput").value;

    let getChoices = document.getElementById("ratings");
    let vote = getChoices.options[getChoices.selectedIndex].value;

    let updatedEndpoint = 'http://localhost:8080/candidate/' + candidateID + "/vote/" + vote; 
    getStuff(updatedEndpoint);

}