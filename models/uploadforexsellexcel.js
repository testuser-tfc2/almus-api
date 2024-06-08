const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const forexsellmasterSchema = new Schema({
   type :  {type: String},
   company_name :  {type: String},
   invoice_no :  {type: String},
   bank_name :  {type: String},
   currency:  {type: String},
   amount_in_fc :  {type: String},
   start_date :  {type: String},
   from_date :  {type: String},
   to_date :  {type: String},
   spot :  {type: String},
   premium :  {type: String},
   bank_margin :  {type: String},
   userid : { type: String },
   reference_no: { type: String },
	created_at : Date,
	updated_at : Date,
	created_by : { type: String, deafult: '' },
	updated_by : { type: String, deafult: '' },
});

module.exports = mongoose.model('forexsellinput_master',forexsellmasterSchema);



