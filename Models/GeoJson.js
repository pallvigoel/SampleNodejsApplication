const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
    _id:{
        type:String
    },
  type:{
    type:String,
    default:"Point"
  },
  coordinates:{
    lat:{type:Number},
    long:{type:Number}
  }
})
module.exports = mongoose.model('Geo', GeoSchema)
