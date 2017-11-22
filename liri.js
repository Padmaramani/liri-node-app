// Include the geocoder NPM package (Remember to run "npm install geocoder"!)

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

function makeSpotifyCall(trackName) {
  
  var spotify = new Spotify({
   id: 'c0b4378222724c14b57a59e692310049',
   secret: '763c074a06a848558944de1ad67638f0'
  });
  
  console.log(trackName);
  spotify.search({ type: 'track', query: trackName ,limit:'20' }, function(err, data) {
   if (err) {
     return console.log('Error occurred: ' + err);
   }
  
  console.log('Name of the artist: '+data.tracks.items[0].artists[0].name);
  console.log('Name of the track: '+data.tracks.items[0].name);
  console.log('Name of the album: '+data.tracks.items[0].album.name);
  console.log('Spotify link for the track: '+data.tracks.items[0].album.external_urls.spotify);
  
  });
  };
  
 
function makeTwitterCall() {

console.log("inside twitter");
var client = new Twitter({
    consumer_key: 'dTfx96GWDLdGDEhBdHCdKIEzP',
    consumer_secret: '2R0HuoGUohTZm3QTTEeP0d6NPsYAU9kXZ2yOXqaXzqLdX13Jjv',
    access_token_key: '932840164241444864-9YKAki0zVISf7Ol432pVUeCtC7d0sl7',
    access_token_secret: 'OEiParAGbfz3hy5i2qLMkEl84GpcSBGrPLD3phMgWyRxY'
    });

var params = {screen_name: 'cvemommy'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
   // console.log(tweets);
  for (i=0;i<tweets.length;i++) {
    console.log(tweets[i].text)
   
 }
  }
});


function makeMovieCall(movieName) {
 
console.log("inside imdb");
// Grab or assemble the movie name and store it in a variable called "movieName"
//var movieName = "matrix";
// ...

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";


// This line is just to help us debug against the actual URL.
 console.log(queryUrl);


// Then create a request to the queryUrl
// ...
// Then run a request to the OMDB API with the movie specified
request(queryUrl, function(error, response, body) {
  
    // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Name of the Movie: " + JSON.parse(body).Title);
      console.log("Year the movie came out: " + JSON.parse(body).Year);
      console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
      console.log("Country where movie was produced: " + JSON.parse(body).Country);
      console.log("Language of the movie: " + JSON.parse(body).Language);
      console.log("Plot of the movie: " + JSON.parse(body).Plot);
      console.log("Actors in the movie: " + JSON.parse(body).Actors);

    }
  });
};
};

// Take in the command line arguments
var callType = process.argv[2];
console.log(callType);

if (callType == "my-tweets" ){
  makeTwitterCall()
} 
else if (callType == "spotify-this-song" ){
  var trackName = process.argv[3];
  if(typeof trackName == "undefined") {
    trackName="The Sign";
    } 
  makeSpotifyCall(trackName);
}
else if (callType == "movie-this" ){
  movieName=process.argv[3];
  
  if(typeof movieName == "undefined") {
      movieName='Mr.Nobody';
  } 
  
  makeMovieCall(movieName)  
}
else if (callType == `do-what-it-says` ) {

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
  })   
  var dataArr = data.split(",");
 
   callType=dataArr[0];
   trackName=dataArr[1];
  }
