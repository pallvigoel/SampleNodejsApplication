const MongoClient = require("mongodb").MongoClient;
const CONNECTION_URL = "mongodb+srv://Krishna:Krishna@cluster1.zqxot.mongodb.net/sample_airbnb?retryWrites=true&w=majority"
const DATABASE_NAME = "sample_airbnb";

const state ={
    db:null
};

//This is a singelton connection(only made when app is initialised)
const connect = (cb)=>
{
    if(state.db) // If db instance already exists
    {
         cb();
    }
    else{ MongoClient.connect(CONNECTION_URL,
            { useNewUrlParser: true },{ useUnifiedTopology: true } ,
            (error, client) => {
            state.db =  client.db(DATABASE_NAME);
                cb();
            });}
}

const getDb =()=>
{
return state.db;
}

module.exports= {getDb,connect};
   