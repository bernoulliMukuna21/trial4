let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');

let mongoURI = 'mongodb://localhost:27017';
//let mongoURI = 'mongodb+srv://bernoulliMukuna21:reJ2YhAXrv6mhMW@stickler-zmx1n.mongodb.net/test?authSource=admin&replicaSet=Stickler-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true'
/*
var db;

module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect(mongoURI,
            {useUnifiedTopology: true, useNewUrlParser: true},
            function(err, client){
                assert.equal(null, err);
                db = client.db('excellence_freelance');
                return callback(err)
            })
    },
    getDb: function (){
    return db
    }
}
 */