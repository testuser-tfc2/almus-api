const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const exportmasterSchema = new Schema({
   type :  {type: String},
   cunter_party_name :  {type: String},
   invoice_no :  {type: String},
   currency:  {type: String},
   amount_in_fc :  {type: String},
   start_date :  {type: String},
   due_date :  {type: String},
   bank_name :  {type: String},
   userid : { type: String },
   reference_no: { type: String },
	created_at : Date,
	updated_at : Date,
	created_by : { type: String, deafult: '' },
	updated_by : { type: String, deafult: '' },
});

module.exports = mongoose.model('exportinput_master',exportmasterSchema);



