// Purpose is to create a block of timestamped random data
// and store it in MongoDB for testing charting libraries.

var dotenv = require('dotenv');
var dotenvExpand = require('dotenv-expand');

var myEnv = dotenv.config();
dotenvExpand(myEnv);

var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');
var moment = require('moment');

var dburl = process.env.DB_URL;

MongoClient.connect(dburl, function (err, db) {
  assert.equal(null, err);
  console.log('Connected successfully to MongoDB');

  // Current time
  var now = moment();

  // Starting time = current time minus a period to create data span
  // Clone 'now' to ensure now and begin are the same time reference
  var begin = now.clone().subtract(5, 'day');
  console.log('NOW :', now.toISOString());
  console.log('BEGIN :', begin.toISOString());
  console.log(' ');
  // This configures random data insertion starting five days ago
  // and incrementing by a number of hours.
  // See momentjs docs for options & syntax
  for (begin; begin <= now; begin.add(6, 'hour')) {
    console.log('TIMESTAMP :', begin.toISOString());

    var max = 100;
    var min = 1;
    var data = Math.floor((Math.random() * ((max + 1) - min)) + min);
    //    var data = (Math.random() * 100);

    console.log('randomData :', data); // do not set decimal places: converts number to string
    insertData(db, begin.toISOString(), data, function () {
      console.log('Document Inserted!');
    });
  }
  db.close();
  console.log('DB Closed');
});

var insertData = function (db, nowISO, data) {
  var collection = db.collection(process.env.DB_COLL);

  collection.insertOne({'TimeStamp': nowISO, 'Data': data}, function (err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
  });
//  return();
};
