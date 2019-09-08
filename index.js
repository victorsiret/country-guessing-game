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

//VARIABLES
//Data
let countries = ["Afghanistan",
"Albania",
"Algeria",
"Andorra",
"Angola",
"Antigua and Barbuda",
"Argentina",
"Armenia",
"Australia",
"Austria",
"Azerbaijan",
"Bahamas",
"Bahrain",
"Bangladesh",
"Barbados",
"Belarus",
"Belgium",
"Belize",
"Benin",
"Bhutan",
"Bolivia",
"Bosnia and Herzegovina",
"Botswana",
"Brazil",
"Brunei",
"Bulgaria",
"Burkina Faso",
"Burundi",
"Côte d'Ivoire",
"Cabo Verde",
"Cambodia",
"Cameroon",
"Canada",
"Central African Republic",
"Chad",
"Chile",
"China",
"Colombia",
"Comoros",
"Congo (Congo-Brazzaville)",
"Costa Rica",
"Croatia",
"Cuba",
"Cyprus",
"Czechia (Czech Republic)",
"Democratic Republic of the Congo",
"Denmark",
"Djibouti",
"Dominica",
"Dominican Republic",
"Ecuador",
"Egypt",
"El Salvador",
"Equatorial Guinea",
"Eritrea",
"Estonia",
"Eswatini (fmr. 'Swaziland')",
"Ethiopia",
"Fiji",
"Finland",
"France",
"Gabon",
"Gambia",
"Georgia",
"Germany",
"Ghana",
"Greece",
"Grenada",
"Guatemala",
"Guinea",
"Guinea-Bissau",
"Guyana",
"Haiti",
"Holy See",
"Honduras",
"Hungary",
"Iceland",
"India",
"Indonesia",
"Iran",
"Iraq",
"Ireland",
"Israel",
"Italy",
"Jamaica",
"Japan",
"Jordan",
"Kazakhstan",
"Kenya",
"Kiribati",
"Kuwait",
"Kyrgyzstan",
"Laos",
"Latvia",
"Lebanon",
"Lesotho",
"Liberia",
"Libya",
"Liechtenstein",
"Lithuania",
"Luxembourg",
"Madagascar",
"Malawi",
"Malaysia",
"Maldives",
"Mali",
"Malta",
"Marshall Islands",
"Mauritania",
"Mauritius",
"Mexico",
"Micronesia",
"Moldova",
"Monaco",
"Mongolia",
"Montenegro",
"Morocco",
"Mozambique",
"Myanmar (formerly Burma)",
"Namibia",
"Nauru",
"Nepal",
"Netherlands",
"New Zealand",
"Nicaragua",
"Niger",
"Nigeria",
"North Korea",
"North Macedonia",
"Norway",
"Oman",
"Pakistan",
"Palau",
"Palestine State",
"Panama",
"Papua New Guinea",
"Paraguay",
"Peru",
"Philippines",
"Poland",
"Portugal",
"Qatar",
"Romania",
"Russia",
"Rwanda",
"Saint Kitts and Nevis",
"Saint Lucia",
"Saint Vincent and the Grenadines",
"Samoa",
"San Marino",
"Sao Tome and Principe",
"Saudi Arabia",
"Senegal",
"Serbia",
"Seychelles",
"Sierra Leone",
"Singapore",
"Slovakia",
"Slovenia",
"Solomon Islands",
"Somalia",
"South Africa",
"South Korea",
"South Sudan",
"Spain",
"Sri Lanka",
"Sudan",
"Suriname",
"Sweden",
"Switzerland",
"Syria",
"Tajikistan",
"Tanzania",
"Thailand",
"Timor-Leste",
"Togo",
"Tonga",
"Trinidad and Tobago",
"Tunisia",
"Turkey",
"Turkmenistan",
"Tuvalu",
"Uganda",
"Ukraine",
"United Arab Emirates",
"United Kingdom",
"United States of America",
"Uruguay",
"Uzbekistan",
"Vanuatu",
"Venezuela",
"Vietnam",
"Yemen",
"Zambia",
"Zimbabwe"
];    
let real = [38041754,
    2880917,
    43053054,
    77142,
    31825295,
    97118,
    44780677,
    2957731,
    25203198,
    8955102,
    10047718,
    389482,
    1641172,
    163046161,
    287025,
    9452411,
    11539328,
    390353,
    11801151,
    763092,
    11513100,
    3301000,
    2303697,
    211049527,
    433285,
    7000119,
    20321378,
    11530580,
    25716544,
    549935,
    16486542,
    25876380,
    37411047,
    4745185,
    15946876,
    18952038,
    1433783686,
    50339443,
    850886,
    5380508,
    5047561,
    4130304,
    11333483,
    1198575,
    10689209,
    86790567,
    5771876,
    973560,
    71808,
    10738958,
    17373662,
    100388073,
    6453553,
    1355986,
    3497117,
    1325648,
    1148130,
    112078730,
    889953,
    5532156,
    65129728,
    2172579,
    2347706,
    3996765,
    83517045,
    30417856,
    10473455,
    112003,
    17581472,
    12771246,
    1920922,
    782766,
    11263077,
    799,
    9746117,
    9684679,
    339031,
    1366417754,
    270625568,
    82913906,
    39309783,
    4882495,
    8519377,
    60550075,
    2948279,
    126860301,
    10101694,
    18551427,
    52573973,
    117606,
    4207083,
    6415850,
    7169455,
    1906743,
    6855713,
    2125268,
    4937374,
    6777452,
    38019,
    2759627,
    615729,
    26969307,
    18628747,
    31949777,
    530953,
    19658031,
    440372,
    58791,
    4525696,
    1269668,
    127575529,
    543486,
    4043263,
    38964,
    3225167,
    627987,
    36471769,
    30366036,
    54045420,
    2494530,
    10756,
    28608710,
    17097130,
    4783063,
    6545502,
    23310715,
    200963599,
    25666161,
    2083459,
    5378857,
    4974986,
    216565318,
    18008,
    4981420,
    4246439,
    8776109,
    7044636,
    32510453,
    108116615,
    37887768,
    10226187,
    2832067,
    19364557,
    145872256,
    12626950,
    52823,
    182790,
    110589,
    197097,
    33860,
    215056,
    34268528,
    16296364,
    8772235,
    97739,
    7813215,
    5804337,
    5457013,
    2078654,
    669823,
    15442905,
    58558270,
    51225308,
    11062113,
    46736776,
    21323733,
    42813238,
    581372,
    10036379,
    8591365,
    17070135,
    9321018,
    58005463,
    69625582,
    1293119,
    8082366,
    104494,
    1394973,
    11694719,
    83429615,
    5942089,
    11646,
    44269594,
    43993638,
    9770529,
    67530172,
    329064917,
    3461734,
    32981716,
    299882,
    28515829,
    96462106,
    29161922,
    17861030,
    14645468
];
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
const arrSum = arr => arr.reduce((a,b) => a + b, 0)
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  

let round = -1;
const rounds = countries.length;
let lastround = false;
const totalpop = arrSum(real);
let p1name = "";
let p2name = "";
let p1wins = 0;
let p2wins = 0;
let p1sum = 0;
let p2sum = 0;
let data = [];
let winningUser = "";
let finalWinner = "";

//EXPRESS
const app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//PARSER
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//RENDER PAGES
//Home
app.get('/', function (req, res) {
    round = -1;
    p1wins = 0;
    p2wins = 0;
    p1sum = 0;
    p2sum = 0;
    finalWinner = "";
    res.render('home', {});
});

app.post('/', function (req, res) {
    p1name = req.body.p1name;
    p2name = req.body.p2name;
    res.render('home', {post:true, p1name: p1name, p2name: p2name});
});

/*//Game Page BACKUP CODE
app.get('/game', function (req, res) {
    round = round + 1;
    res.render('game', {round: round, p1name: p1name, p2name: p2name, country: countries[round]});
});

//Answer Page
app.post('/game', function (req, res) {
    //Parse Guesses
    let p1guess = Number(req.body.p1guess);
    let p2guess = Number(req.body.p2guess);

    //Calculate Percentages
    let p1perc = Math.round(100 * p1guess / real[round]);
    let p2perc = Math.round(100 * p2guess / real[round]);

    //Winner and POST
        if (Math.abs(p1guess - real[round]) < Math.abs(p2guess - real[round])) {drinksp1 = "success"; drinksp2 = "danger"; p1wins++;}
        else {drinksp1 = "danger"; drinksp2 = "success"; p2wins++}
        p1sum += p1guess
        p2sum += p2guess

        //Check if last round
        if (round + 1 === rounds) {lastround = true;}
        else {lastround = false;}

        //Add Data to data
        data[round] = [countries[round], real[round], p1guess, p2guess]
        console.log(data)
    res.render('game', {post:true, lastround: lastround, p1name: p1name, p2name: p2name, previousRound: round, nextRound: round + 1, p1guess: p1guess, p2guess: p2guess, p1perc: p1perc, p2perc: p2perc, country: countries[round], population:real[round], drinksp1: drinksp1, drinksp2: drinksp2});
});*/

//Game Page
app.get('/game', function (req, res) {
    round = round + 1;
    res.render('game', {previousRound: round, nextRound: round + 1, p1name: p1name, p2name: p2name, nextCountry: countries[round]});
});

//Answer Page
app.post('/game', function (req, res) {
    //Parse Guesses
    let p1guess = Number(req.body.p1guess);
    let p2guess = Number(req.body.p2guess);

    //Calculate Percentages
    let p1perc = Math.round(100 * p1guess / real[round]);
    let p2perc = Math.round(100 * p2guess / real[round]);
    let p1drinks = Math.round(Math.max(p1guess/real[round], real[round]/p1guess));
    let p2drinks = Math.round(Math.max(p2guess/real[round], real[round]/p2guess));
    console.log(p1drinks);

    //Winner and POST
        if (Math.abs(p1guess - real[round]) < Math.abs(p2guess - real[round])) {drinksp1 = "success"; drinksp2 = "danger"; p1wins++;}
        else {drinksp1 = "danger"; drinksp2 = "success"; p2wins++}
        p1sum += p1guess
        p2sum += p2guess

        //Check if last round
        if (round + 2 === rounds) {lastround = true;}
        else {lastround = false;}

        //Add Data to data
        data[round] = [countries[round], real[round], p1guess, p2guess]

        //Increase rounds
        round = round + 1

        console.log(data)
    res.render('game', {post:true, lastround: lastround, p1name: p1name, p2name: p2name, previousRound: round, nextRound: round + 1, p1guess: p1guess, p2guess: p2guess, p1perc: p1perc, p2perc: p2perc, country: countries[round - 1], nextCountry: countries[round], population:real[round - 1], drinksp1: drinksp1, drinksp2: drinksp2});
});

//Results Page
app.get('/results', function (req, res) {
    fs.writeFile("data.json", data, function(err) {
        if (err) {
            console.log(err);
        }
});
    res.render('results', {p1name: p1name, p2name: p2name, finalWinner: finalWinner, p1wins: p1wins, p2wins: p2wins, p1sum: p1sum, p2sum: p2sum, totalpop: totalpop});
});

//Use Client
app.use(express.static('client'));

//Port
app.listen(3000, () => console.log('Game app listening on port 3000!'));