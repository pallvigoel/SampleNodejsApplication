const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let GeoModel = require('./GeoJson');
const GeoSchema = new Schema({
  type:{
    type:String,
    default:"Point"
  },
  coordinates:{
    lat:{type:String},
    long:{type:String}
  }
})
const UserSchema = new Schema(
    {
      created_at    : { type: Date, required: true, default: Date.now },
      name: String,
      mobile: String,
      email: String,

      address: { 
          street: String,
          locality: String,
          city: String,
          state: String,
          pincode: String,
          coordinatesType: String,
          geometry:GeoSchema

          } 
    });
    module.exports = mongoose.model('User', UserSchema)

