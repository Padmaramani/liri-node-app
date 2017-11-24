

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

var client = new Twitter({
  consumer_key: 'dTfx96GWDLdGDEhBdHCdKIEzP',
  consumer_secret: '2R0HuoGUohTZm3QTTEeP0d6NPsYAU9kXZ2yOXqaXzqLdX13Jjv',
  access_token_key: '932840164241444864-9YKAki0zVISf7Ol432pVUeCtC7d0sl7',
  access_token_secret: 'OEiParAGbfz3hy5i2qLMkEl84GpcSBGrPLD3phMgWyRxY'
  });


var spotify = new Spotify({
  id: 'c0b4378222724c14b57a59e692310049',
  secret: '763c074a06a848558944de1ad67638f0'
 });


module.exports = {
	client: client,
	spotify: spotify
}