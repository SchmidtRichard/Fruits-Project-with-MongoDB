//Connect to MongoDB
const MongoClient = require('mongodb').MongoClient;

//Assert has to do with testing, validates data entry and connection to MongoDB
const assert = require('assert');

//Connection URL
const url = 'mongodb://localhost:27017';

//Database Name
const dbName = 'fruitsDB';

//Create a new MongoClient
const client = new MongoClient(url, {
  useUnifiedTopology: true
});

//Use connect method to connect to the server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  //Insert documents to the fruitsDB
  //insertDocuments(db, function() {

  //find documents in the fruitsDB
  findDocuments(db, function() {
    client.close();
  });
});

//Create a new collection (fruits)
const insertDocuments = function(db, callback) {

  //Get the documents collection
  const collection = db.collection('fruits');

  //Insert some documents
  collection.insertMany([{
      name: "Apple",
      score: 8,
      review: "Great fruit"
    },
    {
      name: "Orange",
      score: 6,
      review: "Kinda sour"
    },
    {
      name: "Banana",
      score: 9,
      review: "Great stuff"
    }
  ], function(err, result) {
    //Validate to make sure there are no errors
    assert.equal(err, null);

    //Make sure there are 3 results inserted into the collection
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);

    //If it passes the above aserts we console.log the below
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};

//Find all documents
const findDocuments = function(db, callback) {

  //Get the documents collection
  const collection = db.collection('fruits');

  //Find some documents and add them to an array
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
}