//Require mongoose
const mongoose = require('mongoose');

//Connect to the mongoDB server and then look for a DB called fruitsDB and connect to it, if it does not exist it will create it instead
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Create a new schema (blueprint, structure of the data that will be saved into the mongoDB database)
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry. No name has been specified!"]
  },
  rating: {
    type: Number,
    //validate the data entered
    min: 1,
    max: 10
  },
  review: String
});


//Use the schema to create a mongoose model - 1st parameter is the name of the collection that will comply with the fruitSchema schema, 2nd parameter is the schema (fruitSchema)
const Fruit = mongoose.model("Fruit", fruitSchema);

//Create a new fruit document
const fruit = new Fruit({
  name: "Abacaxi",
  rating: 10,
  review: "Pretty good"
});

//Calls the save method in mongoose to save the fruit document above (Apple) into a Fruits collection inside the fruitsDB
fruit.save();

//Create a new schema for a person
const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

//Create a mongoose model schema for a person
const Person = mongoose.model("Person", personSchema);

//Create a new person to the doc
const person = new Person({
  name: "John",
  age: 30
});

//person.save();








// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "Great fruit"
// });
//
//
// const orange = new Fruit({
//   name: "Orange",
//   score: 8,
//   review: "Sweet"
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   score: 10,
//   review: "Great fruit"
// });
//
//
// //Specify the name of the mangoose model (Fruit), which will allow it to connect to the relevant collection, and also know the schema it should work with
// //It takes 2 parameters, the 1st one is an array of objects that match the schema, the second one is a callback which allow us to log any errors if there were any issues inserting all the objects into the fruits collection
// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully saved all the fruits to the fruitsDB")
//   }
// });








//Reading from DB with Mongoose
Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {

    //Close the connection after performing the find of all the fruits
    mongoose.connection.close();

    //Console.log all the fruit array
    console.log(fruits);

    //Loop through the array fruits
    fruits.forEach(function(fruit) {
      //Inside the callback console.log each fruit using the name property
      console.log(fruit.name);
    });
  }
});


// //Find all documents
// const findDocuments = function(db, callback) {
//
//   //Get the documents collection
//   const collection = db.collection('fruits');
//
//   //Find some documents and add them to an array
//   collection.find({}).toArray(function(err, fruits) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(fruits);
//     callback(fruits);
//
//   });
// }