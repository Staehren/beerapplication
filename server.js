var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('beerApp', ['beerlist']);
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/meals-development');
app.use(express.static(__dirname + '/build'));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, + Date.now() + '-' + file.originalname)
    }
});

var upload = multer({ storage: storage });

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


var public_router = express.Router();
require('./app/routes/public.js')(public_router);
app.use('/public', public_router);


app.get('/beerlist', function(req, res) {
  console.log('I received a GET request');

  db.beerlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });

});

app.post('/beerlist', function(req, res) {
  console.log(req.body);
  db.beerlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/beerlist/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.beerlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.get('/beerlist/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.beerlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.put('/beerlist/:id', function(req, res) {
  var id = req.params.id;
  console.log(req.body.title);
  db.beerlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {title: req.body.title, url: req.body.url, type: req.body.type, abv: req.body.abv, brewery: req.body.brewery, description: req.body.description}},
    new: true}, function(err, doc) {
      res.json(doc);
    }
  );
});


app.post('/upload', upload.single('file'), function(req, res, next) {
  console.log("GET HERE level over 9000");

  var data = req.body;
  console.log(data);
  var filename = "default.jpg";

  if(req.file !== undefined)
    filename = req.file.filename;

  var beerObject = {title: data.title, url: data.url, type: data.type, abv: data.abv, brewery: data.brewery, description: data.description, image: filename};
  console.log(beerObject);


  // bodys.append('image', filename);

  db.beerlist.insert(beerObject, function(err, doc) {
    res.json(doc);
  });

  // console.log(req.file);
  // res.json({success: true});
});


app.listen(3001);
console.log("Server running on port 3001");
