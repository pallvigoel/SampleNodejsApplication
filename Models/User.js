const ObjectId = Schema.ObjectId;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserDb = new Schema(
    { name: String,
      mobile: String,
      email: String,
      address: { 
          street: String,
          locality: String,
          city: String,
          state: String,
          pincode: String,
          coordinatesType: String,
          coordinates: [Number] 
          } 
    });
    module.exports = UserDb;