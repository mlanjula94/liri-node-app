require("dotenv").config();
var keys = require('./keys');
var twitter = require("twitter");
var twitterFunc = new twitter(keys.twitter);
var spotify = require("node-spotify-api");
var spotifyFunc = new spotify(keys.spotify);
var request = require("request");

var command = process.argv[2];
var key = process.argv[3];
switchFunc(command,key);

var params = {
  screen_name: 'anjula_chris'
};

function switchFunc(command, key) {
  switch (command) {
    case "my-tweets":
      my_tweets();
      break;
    case "spotify-this-song":
      spotify_song();
      break;
    case "movie-this":
      if (key) {
        omdbData(key)
      } else {
        omdbData("Mr. Nobody")
      }
    case "do-what-it-says":
      doIt();
  }
}

function my_tweets() {
  twitterFunc.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log(tweets);
      for (var i = 0; i < tweets.length; i++) {
        console.log(params.screen_name + " : " + tweets[i].text + "\nCreated At: " + tweets[i].created_at);
        console.log("----------------------------")
      }
    } else {
      console.log(error);
    }
  });
}

function spotify_song() {

  if (!key) {
    spotifyFunc.search({
        type: 'track',
        query: "the sign ace of base"
      })
      .then(function (response) {
        console.log("Artists : " + response.tracks.items[0].artists[0].name);
        console.log("Title : " + response.tracks.items[0].name);
        console.log("URL : " + response.tracks.items[0].artists[0].external_urls.spotify);
        console.log("Album : " + response.tracks.items[0].album.name);
        // console.log(response.artists.items[0].external_url.spotify);
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    spotifyFunc.search({
        type: 'track',
        query: key
      })
      .then(function (response) {
        console.log("Artists : " + response.tracks.items[0].artists[0].name);
        console.log("Title : " + response.tracks.items[0].name);
        console.log("URL : " + response.tracks.items[0].artists[0].external_urls.spotify);
        console.log("Album : " + response.tracks.items[0].album.name);
        // console.log(response.artists.items[0].external_url.spotify);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}

function omdbData(movie) {
  var query = 'http://www.omdbapi.com/?i=tt3896198&apikey=d983780d&t=' + movie;
  console.log("_________________________________")

  request(query, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var body = JSON.parse(body);

      console.log("---------------------------------");
      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Rotten Tomatoes URL: " + body.tomatoURL);
    } else
      console.log(error);

  })
}

function doIt() {
  const fs = require('fs');
  fs.readFile('random.txt', "utf8", function (error, data) {
    var txt = data.split(',');
    key = txt[1];
    switchFunc(txt[0],txt[1]);
    console.log(txt);
  });
}