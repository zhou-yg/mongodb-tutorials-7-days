/**
 * Created by zyg on 15/9/26.
 */
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/mongo_tutorials_7_days';
var collectionName = 'tutorials';

var insertDocument = function (db, callback) {
    var collection = db.collection(collectionName);
    collection.insertMany([
        {a: 1},
        {b: 2},
        {c: 3}
    ], function (err, result) {
        callback(result);
    });
};

var updateDocument = function (db, callback) {
    var collection = db.collection(collectionName);
    collection.updateMany(
        [{c: 3}],
        [{
            $set: {
                c: 1
            }
        },{
            $set:{
                c: 2
            }
        },{
            $set:{
                c: 3
            }
        }],
        function (err, result) {
            callback(result);
        }
    )
};

var removeDocument = function (db, callback) {
    var collection = db.collection(collectionName);
    collection.deleteOne({c: 3}, function (err, result) {
        callback(result)
    });
};

var findDocument = function (db, callback) {
    var collection = db.collection(collectionName);
    collection.find({}).toArray(function (err, docs) {
        callback(docs);
    })
};

MongoClient.connect(url, function (error, db) {
    var allStars = db.collection('allstars');

    //insertDocument(db, function (r) {
    //    console.log(r);
    //    console.log('========================');
    //    updateDocument(db, function (r) {
    //        console.log(r);
    //        console.log('========================');
    //        findDocument(db, function (r) {
    //            console.dir(r);
    //            db.close();
    //            console.log('========================');
    //        });
    //    })
    //});
    updateDocument(db, function (r) {
        console.log(r);
        console.log('========================');
        findDocument(db, function (r) {
            console.dir(r);
            db.close();
            console.log('========================');
        });
    })
});