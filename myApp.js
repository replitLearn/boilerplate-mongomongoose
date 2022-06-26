require('dotenv').config();

const mongoose = require('mongoose');

const mySecret = process.env['MONGO_URI']
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });




const { Schema } = mongoose;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);




const createAndSavePerson = (done) => {
  const person = new Person({ name: "omar", age: 23, favoriteFoods: ["pizza", "nuggets"] })
  person.save(function(err, data) {
    done(err, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    done(err, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    done(err, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    done(err, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    done(err, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    data.favoriteFoods.push(foodToAdd)
    data.save((err, data) => {
      done(err, data);
    })


  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, data) => {
    done(err, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, (err, data) => {
    done(err, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = { name: "Mary" };

  Person.remove(nameToRemove, (err, removalInfo) => {
    if (err) return console.log(err);
    done(null, removalInfo);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }).sort({name: 1}) .limit(2).select(["name", "favoriteFoods"]).exec((error, data) => {
    done(error, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;



