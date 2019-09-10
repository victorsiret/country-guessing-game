//NPM Modules
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const request = require("request");
const fs = require('fs');


// Population API
/*let hello = request.get("http://54.72.28.201:80/1.0/countries", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(JSON.parse(body));
});*/

//___________________________________________________________________________
//VARIABLES
//Data
//Load Arrays
const playerBox = require('./client/json/playerBox.json');
const countries = require('./client/json/countries.json');
const real = require('./client/json/population.json');

//Shuffling countries concept
let nums = [1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110,
    111,
    112,
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120,
    121,
    122,
    123,
    124,
    125,
    126,
    127,
    128,
    129,
    130,
    131,
    132,
    133,
    134,
    135,
    136,
    137,
    138,
    139,
    140,
    141,
    142,
    143,
    144,
    145,
    146,
    147,
    148,
    149,
    150,
    151,
    152,
    153,
    154,
    155,
    156,
    157,
    158,
    159,
    160,
    161,
    162,
    163,
    164,
    165,
    166,
    167,
    168,
    169,
    170,
    171,
    172,
    173,
    174,
    175,
    176,
    177,
    178,
    179,
    180,
    181,
    182,
    183,
    184,
    185,
    186,
    187,
    188,
    189,
    190,
    191,
    192,
    193,
    194,
    195
];

//Rounds, counters, functions and such
    //Sum array function
    const arrSum = arr => arr.reduce((a,b) => a + b, 0)
    //Shuffle array function
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
        }
    //Min array function
    Array.min = function( array ){
        return Math.min.apply( Math, array );
        };
    //Max array function
    Array.max = function( array ){
        return Math.max.apply( Math, array );
        };
  

let round = -1;
const rounds = countries.length;
let lastround = false;
const totalpop = arrSum(real);

//Loops
let i;

//Create player data matrix
let pData = [];

//Create data object to collect data
let data = [];

let winningUser = "";
let finalWinner = "";

//___________________________________________________________________________
//EXPRESS
const app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//PARSER
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//___________________________________________________________________________
//RENDER PAGES
    //Home 
        //Get
        app.get('/', function (req, res) {
            //Reset Vars
            round = -1;
            finalWinner = "";

            //Reset Player Data
            pData = [];

            //Render Page
            res.render('home', {playerBox: playerBox});
        });

        //Post
        app.post('/', function (req, res) {
            //Find number of players from hidden form element
            players = req.body.players;

            //Get names
            for (i = 0; i < players; i++) {
                pData[i] = {};
                pData[i]["name"] = req.body["p" + i + "name"];
                pData[i]["wins"] = 0;
                pData[i]["sum"] = 0;
            }

            res.render('home', {post:true, pData: pData});
        });

//Game Page
    //Get
    app.get('/game', function (req, res) {
        round = round + 1;
        res.render('game', {previousRound: round, nextRound: round + 1, pData: pData, nextCountry: countries[round]});
    });

    //Answer Page [Post]
    app.post('/game', function (req, res) {
        //Parse Guesses
        //Get guesses and run calculations
        for (i = 0; i < players; i++) {
            pData[i]["guess"] = Number(req.body["p" + i + "guess"]);
            pData[i]["percentage"] = Math.round(100 * pData[i]["guess"] / real[round]);
        }

        //Determine round winner(s)
        let roundData = [];
            //Calculate each absolute difference
            for (i = 0; i < players; i++) {
                pData[i]["abs"] = Math.abs(pData[i]["guess"] - real[round]);
                roundData[i] = Math.abs(pData[i]["guess"] - real[round]);
                pData[i]["sum"] += pData[i]["guess"];
                }
            //Find minimum absolute difference
            for (i = 0; i < players; i++) {
                if (pData[i]["abs"] === Array.min(roundData)) {
                    pData[i]["drinks"] = "success";
                    pData[i]["wins"] ++;
                    }
                else {pData[i]["drinks"] = "danger";}
                }

        //Check if last round
        if (round + 2 === rounds) {lastround = true;}
        else {lastround = false;}

        //Add Data to data - NEEDS FIXING
        //data[round] = 

        //Increase rounds
        round = round + 1

        //Render Page
        res.render('game', {post:true, pData: pData, country: countries[round-1], nextCountry: countries[round], population: real[round-1], lastround: lastround, previousRound: round, nextRound: round + 1});
    });

//Results Page: Displays Game Results
    app.get('/results', function (req, res) {
        
        //Determine Winner
        //if (pData[0]["wins"] < pData[1]["wins"]) {finalWinner = pData[1]["name"]}
        //else {finalWinner = pData[0]["name"]}

        //Determine overall winner
            let wins = [];
            //Loop to create wins array
            for (i = 0; i < players; i++) {
                wins[i] = pData[i]["wins"];
                }
            //Find player with max wins
            for (i = 0; i < players; i++) {
                if (Array.max(wins) === pData[i]["wins"]) {
                    finalWinner = pData[i]["name"];
                }}

        //Write Data to Folder - NEEDS FIXING
        fs.writeFile("data.json", data, function(err) {
            if (err) {
                console.log(err);
            }
    });
        res.render('results', {pData: pData, finalWinner: finalWinner, totalpop: totalpop});
    });

//___________________________________________________________________________
//Use Client
app.use(express.static('client'));

//Port
app.listen(3000, () => console.log('Game app listening on port 3000!'));