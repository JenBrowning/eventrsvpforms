const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const assert = require("assert");
const app = express();
const publicPath = "public/";


app.set('view engine', 'pug');


app.post('/', function (request, response) {
    let alias = request.body.name
    let contactEmail = request.body.email
    let yesOrNo = request.body.attending
    let numberOfGuestsComing = request.body.number
    let newRSVP = new RSVP({
        name: alias,
        email: contactEmail,
        attending: yesOrNo,
        numberOfGuests: numberOfGuestsComing,

    })
    response.send(guestList.pug)
});