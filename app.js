const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const assert = require("assert");
const app = express();
const publicPath = "public/";


const url = 'mongodb://localhost:27017';

const dbName = 'rsvp';

app.set("view engine", "pug");

app.get("/", (request, response) => {
    response.render("index");
});

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);



    
    // insertDocuments(db, function() {
    //     updateDocument(db, function() {
    //         removeDocument(db, function() {
    //             indexCollection(db, function() {

    //             });
    //         });
    //     });
    // });
});

app.listen(3000, ()=> {console.log("The Server has started on Port 3000")});

// const insertDocuments = function(db, callback) {

//     const collection = db.collection('documents');

//     collection.insertMany([
//         {a : 1}, {a : 2}, {a: 3}
//     ], function(err, result) {
//         assert.equal(err, null);
//         assert.equal(3, result.result.n);
//         assert.equal(3, result.ops.length);
//         console.log('Inserted 3 documents into the collection');
//         callback(result);
//     });
// }