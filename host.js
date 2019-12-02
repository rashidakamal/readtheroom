
async function getStuff(endpoint) {

    console.log(endpoint);
    const response = await fetch(endpoint);
    const data = await response.text();
    console.log(data);

}
  candidates = [Biden, Bernie, Warren, Yang];

   for (i = 0; i <= candiates.length; i++) {
      let choice = candiates[i];

      console.log(candidates);
      let updatedEndpoint = 'https://debate-room.herokuapp.com/candidate/new/' + choice;
      getStuff(updatedEndpoint);

    }
