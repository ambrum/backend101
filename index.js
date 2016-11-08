var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var db = new Db('backend101', new Server('localhost', 27017));

db.open(function(err, db){
    if (err){
        console.log(err);
        return;
    }
   var collection = db.collection('users');
    collection.insert({username: 'vazgenchik', password: 'vazgen', display_name: 'Vazgen'}, function(err, result){
        console.log(err, result);
        console.log(require('mongodb'));
    })  ;
})

