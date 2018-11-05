const express = require("express");
const mongoose = require('mongoose');
const app = express();
const url = 'mongodb://localhost:27017/rsvp'
mongoose.connect(url);
let db = mongoose.connection;

const port = 3000;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    app.listen(port, () => {
        console.log('server is running on port', port)
    });
})

app.set("view engine", "pug");
app.use(express.urlencoded());

let rsvpSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    attending: {type: Boolean},
    numberOfGuests:{type: Number}
});

//create model
let ReservationModel = mongoose.model('ReservationModel', rsvpSchema)

//create an iteration of the mongoose


// get for the main page
app.get("/", (request, response) => {
    response.render("index");
});

app.post('/rsvpSubmitted', function (request, response, next) {
    let alias = request.body.name
    let contactEmail = request.body.email
    let yesOrNo = request.body.attending
    console.log(request.body)
    let numberOfGuestsComing = request.body.number
    let newRSVP = new ReservationModel({
        name: alias,
        email: contactEmail,
        attending: yesOrNo,
        numberOfGuests: numberOfGuestsComing
    })
    newRSVP.save(function(err, newRSVP) {
        if(err) {
        console.log(err)
        response.status(500)
        response.send();
        //to create an error page
        }else {
        response.render("rsvpSubmitted");
        };
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



