var express = require('express');
var fetch = require("node-fetch");


var app = express();
var PORT = process.env.PORT || 4200;
var fs = require('fs');

app.use(express.static(__dirname + '/frontend'));

app.get('/', function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./frontend/site_look.html', null, function (err, data) {
       if(err){
           response.write("Error occured during loading html file");
       }else{
           response.write(data);
       }
       response.end();
    });
});

app.get('/get_data', function (request, response) {

    console.log("Currently fetching data...");
    ///agh-noise-measurement-unit-2?last=1h
    console.log(request.query);
    var apiString = request.query.deviceName + "?last=" + request.query.timeSpan;
    console.log(apiString);
    fetch("https://agh-noise-measurement-network.data.thethingsnetwork.org/api/v2/query/" + apiString, {
        headers: {
            Accept: "application/json",
            Authorization: "key ttn-account-v2.4YL9PaQB7xMWYq3cKqkeTGL0XXi6FiJ8GiR5lxYT60I"
        }
    })
        .then(function (responseFetch) {
            return responseFetch.json();
        })
        .then(function (obj) {
            response.send(obj);
        })
})

app.listen(PORT, function(){

    /*DZIALA TEGO KURWA NIE RUSZAJ */
    /*
    var json_out;
    var response = fetch("https://agh-noise-measurement-network.data.thethingsnetwork.org/api/v2/query?last=130h", {
        headers: {
            Accept: "application/json",
            Authorization: "key ttn-account-v2.4YL9PaQB7xMWYq3cKqkeTGL0XXi6FiJ8GiR5lxYT60I"
        }
    })
        .then(res => res.json())
        .then(data =>console.log(data[0]));
     */

    console.log("Everything appears to be working on port 4200");
});