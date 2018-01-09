var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/exampledb';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get', function(req, res, next){
  var resultArray = [];
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var cursor = db.collection('objects').find();
    cursor.forEach(function(doc, err){
      assert.equal(null, err);
      resultArray.push(doc);
    }, function(){
      db.close();
      res.json({items: resultArray});
    })
  })
});

router.post('/', function(req, res, next){
  var obj = {
    name: req.body.name,
  }
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('objects').insertOne(obj, function(err, result){
      assert.equal(null, err);
      console.log('inserted');
      db.close();
    });
  });
  res.json({message: "success"});
});



module.exports = router;
