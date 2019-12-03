# Read the Room

**Read the Room** is an interface for measuring and displaying group sentiment across a set of candidates. Read the Room was designed specifically for a small to medium sized debate party that would allow tracking of voter sentiment throughout the debate. The host adds candidates to the host client ahead of time. Each voter is allowed to upvote or downvote a candidate by one point with all candidates starting at 0. The display client will show all candidates current score with a ticker (similar to a stock markets) that is either up (green) or down (red). The color and ticker will depend on how the candidates score has changed from its previous state (has it gone up or down). This allows the audience to understand the performance of each candidate in real time (if they are red or green) and their sentiment over time during a debate (total candidate score). The host is also able to reset the counter once the debate has ended and use it for any future debates.

### Questions we kept in mind when building Read the Room:

+ How much spontaneity is appropriate?
+ How much change does the user need to see?
+ How should we account for outliers in voters?
+ Should voting be subtle? How visible should it be?

We wanted to allow for spontaneity in voting, allowing voters more than one vote per candidate.  During a debate, if a candidate says something that a voter either resonates with or doesn’t, they should be allowed to up or down vote that candidate. Thus Read the Room tracks voter sentiment of candidates across a debate.

We reduced change in candidate score to a simple color and ticker. We felt having a chart showing total change over time would be too noisy to the viewer and distract them from understanding the current sentiment (since spontaneity in voting was what we wanted to prioritize).

We felt the need to allow outliers (voters that have voted more than others and thus have affected the candidate score the most) in Read the Room because our goal is sentiment measurement and outliers reflect strong voter sentiments, we didn’t want to dampen extreme reactions. Therefore we don’t limit the amount of votes per voter. In order to account for outliers, we wanted to make their contribution visible by showing top voters (voters who voted the most) per each candidate. This acknowledges the outliers and makes voters aware that all voters may not be contributing equally by displaying a certain amount of transparency. We also show the top voter (by ID), displaying how many times they voted.

Test out Read The Room with a Democratic Debate video [here.](https://www.youtube.com/watch?v=5_3F2h_FT98)

# API Endpoints:

+ `/candidate/new/:name`: Adds a new candidate by name
+ `/voter/new/:UUID`: Adds a new voter to server database
+ `/:UUID/upvote/:canID/`: Adds a +1 vote for the candidate in question
+ `/:UUID/downvote/:canID/`: Adds a -1 vote for the candidate in question
+ `/candidate/all/`: Returns all candidates on the server database by name.
+ `/votes/all/`: Returns all voters on the server database.
+ `/candidate/:num/allvotes`: Returns all votes in the server database for a given candidate.
+ `/candidate/:num/total`: Returns summation of all up and down votes for a given candidate.  
