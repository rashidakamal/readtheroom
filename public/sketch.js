let candidateNames = [];
var candidateTotal = [];
var candidateLastTotal = [];
var candidateTopVotes = [];


let nameFont;
let totalFont;

function preload() {
  nameFont = loadFont('assets/BebasNeue-Regular.ttf');
  totalFont = loadFont('assets/ChakraPetch-Regular.ttf');
  lookupCandidate(); //push names into candidateNames
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  lookupCandidate(); //push names into candidateNames


  //get number of candidates
  updateLast();
  setInterval(getCanTotal, 500);
}

function updateLast() {
  setInterval(function(){ 

      for(i=0; i<candidateTotal.length; i++)
      {
        candidateLastTotal[i] = candidateTotal[i];
      }
  }, 10000);
}

function getCanTotal(){
  for (i = 0; i < candidateNames.length; i++) {
   lookupCandidateTotal(i);
  }
}

function draw() {

  background(108, 134, 167);
  frameRate(1);
  // console.log(candidateTotal);


  if (candidateTotal.length > 0) {

    //calculate where to draw names and total rating
    var sw = width / (candidateNames.length);

    hh = height / 2;
    nh = hh - 70;
    th = hh + 10;

    for (i = 0; i < candidateNames.length; i++) {
      rl = 0 + i * sw + sw / 2;
      tl = rl + 14;
      textAlign(CENTER, CENTER);
      noStroke();

      //draw rect
      fill(20 - i * 5, 60 + i * 20, 180 - i * 10);
      rect(i * sw, 0, sw, height);

      //draw name
      textFont(nameFont);
      textSize(36);
      fill(255, 255, 255, 240);
      text(candidateNames[i], rl, nh);

      //draw total w color
      textSize(48);
      textFont(totalFont);
      let x1 = tl + 16 + 14;
      let y1 = th + 13 - 2;
      let x2 = tl + 8 + 14;
      let y2 = th + 0 - 2;
      let x3 = tl + 0 + 14;
      let y3 = th + 13 - 2;
      // //draw total
      if (candidateTotal[i] > candidateLastTotal[i]) {
        //render text green
        fill(0, 255, 0, 200);
        text(candidateTotal[i], rl, th);
        triangle(x1, y1, x2, y2, x3, y3);

      } else if (candidateTotal[i] == candidateLastTotal[i]) {
        //render grey text
        fill(255, 255, 255, 150);
        text(candidateTotal[i], rl, th);

      } else if (candidateTotal[i] < candidateLastTotal[i]) {
        //render text red
        fill(255, 0, 0, 200);
        text(candidateTotal[i], rl, th);
        triangle(x1, y1-13, x2, y2+13, x3, y3-13);

      } else {
        fill(255, 255, 255, 150);
        text(candidateTotal[i], rl, th);
        // text("waiting for number", rl, th);
      }

      //draw all votes
      textSize(20);
      fill(255, 255, 255, 100);

      text("Most passionate person", rl, th+70);
      text( "voted " + candidateTopVotes[i] + " time(s)", rl, th+106);

      var highestVote = lookupAllVotes(i);


    }
  } else{
      //draw waiting screen
      textAlign(CENTER, CENTER);
      noStroke();

      //draw rect
      textFont(nameFont);
      textSize(36);
      fill(0,0,0, 200);
      text("Waiting for Candidates to be Added...", width/2, height/2);
  }

}

async function lookupCandidate() {

  let updatedEndpoint = 'https://debate-room.herokuapp.com/candidate/all/';
  var response = await getNames(updatedEndpoint);
}

async function getNames(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  candidateNames = data.candidates;
}
function lookupCandidateTotal(candidateID) {

  let updatedEndpoint = 'https://debate-room.herokuapp.com/candidate/' + candidateID + "/total";
  var response = getTotal(updatedEndpoint);
}

async function getTotal(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
candidateTotal.splice(data.id, 1, data.total)
}

function lookupAllVotes(candidateID) {

  let updatedEndpoint = 'https://debate-room.herokuapp.com/candidate/' + candidateID + "/allvotes";
  var response = getAllVotes(updatedEndpoint);
}

async function getAllVotes(endpoint, candidateID) {
  const response = await fetch(endpoint);
  const data = await response.json();
  sortAllVotes(data, candidateID);
}

function sortAllVotes(voteData, candidateID){

  if (voteData.length == 0) {
    return null;
  }
  var modeMap = {};
  var maxVoter = voteData[0].voter;
  var maxCount = 1;
  for (i in voteData){

    var el = voteData[i].voter;
    if(modeMap[el] == null){
      modeMap[el] = 1;
    } else {
      modeMap[el]++;
    }
    if (modeMap[el] > maxCount){
      maxEl = el;
      maxCount = modeMap[el]
    }
  }
  // console.log(maxEl);
  // console.log(maxCount);
  
  candidateTopVotes.splice(voteData[0].id, 1, maxCount)

  // return maxEl;
}