require("dotenv").config();
var keys = require('keys');
var twitter = require("twitter");
var twitterFunc = new twitter(keys.twitter);
//var spotify = require("node-spotify-api");
//var spotifyFunc = new spotify(keys.spotify);
var request = require("request");

//console.log(twitterFunc)

var params = {screen_name: 'anjula_chris'};
twitterFunc.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
    console.log("----------------------------")
  }
  else{
    console.log(error);
  }
});