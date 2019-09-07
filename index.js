//NPM Modules
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const request = require("request");


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

//Rounds, counters, functions and such
const arrSum = arr => arr.reduce((a,b) => a + b, 0)

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
    winningUser = "";
    finalWinner = "";
    res.render('home', {});
});

app.post('/', function (req, res) {
    p1name = req.body.p1name;
    p2name = req.body.p2name;
    res.render('home', {post:true, p1name: p1name, p2name: p2name});
});

//Game Page
app.get('/game', function (req, res) {
    round = round + 1;
    res.render('game', {round: round, p1name: p1name, p2name: p2name, country: countries[round]});
});

//Answer Page
app.post('/game', function (req, res) {
    //Parse Guesses
    let p1guess = req.body.p1guess;
    let p2guess = req.body.p2guess;

    //Calculate Percentages
    let p1perc = Math.round(100 * p1guess / real[round]);
    let p2perc = Math.round(100 * p2guess / real[round]);

    //Winner and POST

    let winningUser = "";
        if (Math.abs(p1guess - real[round]) < Math.abs(p2guess - real[round])) {winningUser = p1name; p1wins++;}
        else {winningUser = p2name; p2wins++, console.log(p2wins)}
        p1sum += p1guess
        p2sum += p2guess

        //Check if last round
        if (round === rounds + 1) {lastround = true;}
        else {lastround = false;}

    res.render('game', {post:true, lastround: lastround, p1name: p1name, p2name: p2name, p1guess: p1guess, p2guess: p2guess, p1perc: p1perc, p2perc: p2perc, country: countries[round], population:real[round], winningUser: winningUser});
});

//Results Page
app.get('/game', function (req, res) {
    round = round + 1;
    res.render('game', {p1name: p1name, p2name: p2name, p1wins: p1wins, p2wins: p2wins});
});

//Use Client
app.use(express.static('client'));

//Port
app.listen(3000, () => console.log('Game app listening on port 3000!'));