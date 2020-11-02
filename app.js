//#region Dependencies
const Express = require('express');
const BodyParser = require("body-parser");
var ObjectId = require('mongodb').ObjectID;
let UserModel = require('./Models/User');
let GeoModel = require('./Models/GeoJson');
const db = require('./connection');
const { Mongoose } = require('mongoose');
//#endregion

//#region Initialise App with Middlewares
var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
//#endregion

//#region Api End Points
app.post("/add/user", (request, response) => {
     var { collection, user } = getPostRequest(request);
    collection.insertOne(user, function(err, res) {
      if (err) throw err;
      response.setHeader('Content-Type', 'text/json');

    console.log("document inserted");
    return response.send(res.ops).json();

    });
  });

//Delete user by Id
app.delete('/delete/user/:id', (req, res, next) => {
  var collection = db.getDb().collection("users");

  collection.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

//Get User by Id
app.get("/get/user/:id",async (req, res)=>
{
  var uniqueId = req.params.id;
  var id = ObjectId(uniqueId);
  res.setHeader('Content-Type', 'text/json');
   var result = await  db.getDb().collection("users")
                        .findOne({_id:id  });
    return res.send(result).json();
 });

//Get All Users
app.get('/get/users',async (req,res)=> {
  var query = req.query;
  const page = req.query.page;
  const limit = req.query.limit;


  var collection = db.getDb().collection("users");
  res.setHeader('Content-Type', 'text/json'); 
  
  //if sort parameter is there
  if(query.hasOwnProperty("sort"))
  {
    var result = await collection.find().sort({"created_at": 1});
    return res.send(result.toArray()).json();
  }
  else
  {
  var result = await collection
  .find().toArray();
  
  //Paginate
  const users = result.slice(0, limit);

  return res.send(users).json();
  }
});
    
//Update an existing user
app.put('/update/user/:id', (req, res, next) => {
  var collection = db.getDb().collection("users");
  const user = new UserModel({
        _id: ObjectId(req.params.id),
        name:req.body.name,
        updated_by: Date.now.toString()
     
      });
      collection.updateOne({_id: ObjectId(req.params.id)}, user).then(
        () => {
          res.status(201).json({
            message: 'Thing updated successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    });

//#endregion
 
//#region App Listener
db.connect(()=>
 app.listen(3000,()=> console.log("connected"))
);

function getPostRequest(request) {
  var collection = db.getDb().collection("users");
  var geo = new GeoModel(
    {
      type: request.body.address.geometry.type,
      coordinates: request.body.address.geometry.coordinates,
    });
  var fullAddress = { geometry: geo };
  var user = new UserModel(
    {
      name: request.body.name,
      address: fullAddress
    }
  );
  return { collection, user };
}
//#endregion