//Basic Variables
let players = 2;
document.getElementById("players").value = 2;

//Add player function
function addPlayer() {
    //If up from 2 players, activates the remove players button
    if (players === 2) {document.getElementById("removeButton").style.display = "inline"}
    
    //If up from 7 players, deactivates the add players button
    else if (players === 7) {
        document.getElementById("addButton").setAttribute("class", "btn btn-secondary");
    }
    
    //If avoids going above max number of players
    if (players < 8) {
        players ++;
        id = "player" + players;
        id2 = "p" + players;

        //Show the next player
        document.getElementById(id).style.display = "inline";
        document.getElementById(id2).required = true;

        //Set hidden form element to new number of players for Node server
        document.getElementById("players").value = players;
    }
  }

//Remove player function
function removePlayer() {
    //Hides if removing players down to 2, so that at least two players are in the game
    if (players === 3) {document.getElementById("removeButton").style.display = "none"}
    //If players are going down from 8 then it makes the add button active again 
    else if (players === 8) {document.getElementById("addButton").setAttribute("class", "btn btn-success");}

    //No if because the button disappears when there are only two players
    id = "player" + players;

    //Hide last player
    document.getElementById(id).style.display = "none";
    players --;

    //Set hidden form element to new number of players for Node server
    document.getElementById("players").value = players;
  }