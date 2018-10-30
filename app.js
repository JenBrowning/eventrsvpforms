const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const assert = require("assert");
const app = express();
const publicPath = "public/";

const url = 'mongodb://localhost:27017';
const dbName = 'rsvp';

let mongoose = require('mongoose');
let dbName = mongoose.connection;

app.set("view engine", "pug");

//create model
let ReservationModel = mongoose.model('ReservationModel', rsvpSchema)

//create an iteration of the mongoose
let rsvpSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    attending: {type: Boolean},
    numberOfGuests:{type: Number}
});

// get for the main page
app.get("/", (request, response) => {
    response.render("index");
});

app.post('/', function (request, response, next) {
    let alias = request.body.name
    let contactEmail = request.body.email
    let yesOrNo = request.body.attending
    let numberOfGuestsComing = request.body.number
    let newRSVP = new ReservationModel({
        name: alias,
        email: contactEmail,
        attending: yesOrNo,
        numberOfGuests: numberOfGuestsComing
    })
    newRSVP.save(function(err, mewRSVP) {
        if(err) {
        response.status(500)
        response.send();
        //to create an error page
        }
        response.render();
        //always use render when you want to send back the final html page
    })

});

//get for the client to get the guest list
app.get('/guestList', function(request, response) {
    ReservationModel.find(function(err, reservations) {
        if(err) {
            response.status(500);
            response.send();
            return
            //return here to get the function to stop.
        }
        response.render("guestList", {
            attending: reservations.filter(reservation => reservationModel.attending === true),
            notAttending: reservations.filter(reservation => reservationModel.attending === false)
        });
    });

});

app.listen(3000, ()=> {console.log("The Server has started on Port 3000")});

