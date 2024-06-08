const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const usdinrpremiummasterSchema = new Schema({
   applicable_date :  {type: String},
   applicable_converdate : Date,
   currency :  {type: String},
   tenor :  {type: String},
    settled_date :  {type: String},
     bid_rate:  {type: String},
     offer_rate :  {type: String},
     source :  {type: String},
     userid : { type: String },
	created_at : Date,
	updated_at : Date,
	created_by : { type: String, deafult: '' },
	updated_by : { type: String, deafult: '' },
});

module.exports = mongoose.model('usdinrpremium_master',usdinrpremiummasterSchema);



