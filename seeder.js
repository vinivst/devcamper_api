const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
  //useUnifiedTopology: true
});

//Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

//Import into DB
const importData = () => {
  Bootcamp.create(bootcamps)
    .then(data => {
      console.log('Bootcamps Imported...'.green.inverse);
    })
    .catch(err => {
      console.log(err);
    });

  Course.create(courses)
    .then(data => {
      console.log('Courses Imported...'.green.inverse);
      process.exit();
    })
    .catch(err => {
      console.log(err);
    });
};

//Delete data
const deleteData = () => {
  Bootcamp.deleteMany()
    .then(data => {
      console.log('Bootcamps Destroyed...'.red.inverse);
    })
    .catch(err => {
      console.log(err);
    });

  Course.deleteMany()
    .then(data => {
      console.log('Courses Destroyed...'.red.inverse);
      process.exit();
    })
    .catch(err => {
      console.log(err);
    });
};

if (process.argv[2] == '-i') {
  importData();
} else if (process.argv[2] == '-d') {
  deleteData();
}