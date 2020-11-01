const Express = require('express');
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const CONNECTION_URL = "mongodb+srv://Krishna:Krishna@cluster1.zqxot.mongodb.net/sample_airbnb?retryWrites=true&w=majority"
const DATABASE_NAME = "sample_airbnb";
var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.post("/user", (request, response) => {
    MongoClient.connect(CONNECTION_URL,
         { useNewUrlParser: true },{ useUnifiedTopology: true } ,
         (error, client) => {
              database = client.db(DATABASE_NAME);
              var collection = database.collection("users");

              var user = new UserDb();
              user.name="test"; 
              collection.insertOne(user, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
              });
            });

        });
app.get('/api/books', (req,res)=> {
console.log(collection);
    var myCursor = collection.find( { type: 2 } );
while (myCursor.hasNext()) {
   console.log(JSON.parse(myCursor.next()));
}
    console.log("get");
    res.send("hoi");
    });
     

app.listen(5000,()=>{ console.log("connected")});

