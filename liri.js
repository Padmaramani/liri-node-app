// Include the geocoder NPM package (Remember to run "npm install geocoder"!)

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var clientKeys = require("./keys.js");

function makeMovieCall(movieName) {
  

 var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  request(queryUrl, function(error, response, body) { 
   if (!error && response.statusCode === 200) {
       console.log("Name of the Movie: " + JSON.parse(body).Title);
       console.log("Year the movie came out: " + JSON.parse(body).Year);
       console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
       console.log("Country where movie was produced: " + JSON.parse(body).Country);
       console.log("Language of the movie: " + JSON.parse(body).Language);
       console.log("Plot of the movie: " + JSON.parse(body).Plot);
       console.log("Actors in the movie: " + JSON.parse(body).Actors);
 
  } 
 })
};


function makeSpotifyCall(trackName) {
  
  
  
  clientKeys.spotify.search({ type: 'track', query: trackName ,limit:'20' }, function(err, data) {
   if (err) {
     return console.log('Error occurred: ' + err);
   }
  
  console.log('Name of the artist: '+data.tracks.items[0].artists[0].name);
  console.log('Name of the track: '+data.tracks.items[0].name);
  console.log('Name of the album: '+data.tracks.items[0].album.name);
  console.log('Spotify link for the track: '+data.tracks.items[0].album.external_urls.spotify);
  
  })
  };
  
 
function makeTwitterCall() {

console.log("inside twitter");


var params = {screen_name: 'cvemommy'};

clientKeys.client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
   // console.log(tweets);
  for (i=0;i<tweets.length;i++) {
    console.log(tweets[i].text)
   
 }
  }
})
};


// Take in the command line arguments
var callType = process.argv[2];


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
  
  makeMovieCall(movieName);  
}
else if (callType == "do-what-it-says" ) {

  fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
   }
 
  console.log(data);
  var dataArr = data.split(",");
 
   callType=dataArr[0];
   if (callType=="spotify-this-song"){
   trackName=dataArr[1];
   makeSpotifyCall(trackName);
   }
   else if (callType=="movie-this"){
     movieName=dataArr[1];
     makeMovieCall(movieName)
   }
   else if (callType = "my-tweets"){

   }
  })
}