const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const settledpcfcmasterSchema = new Schema({
    type :  {type: String},
   cunter_party_name :  {type: String},
   invoice_no :  {type: String},
   currency:  {type: String},
   amount_in_fc :  {type: String},
   start_date :  {type: String},
   start_date_convert : Date,
   from_date :  {type: String},
   to_date :  {type: String},
   forwardon_date:  {type: String},
   previous_spot:  {type: String},
   previous_premium:  {type: String},
   booking_rate:  {type: String},
   current_forwardrate:  {type: String},
   edc:  {type: String},
   status:  {type: String},   
   profit_loss:  {type: String},
   settledid : { type: String },
   userid : { type: String },
   bank_name : { type: String },
   gain_loss : { type: String },
   created_at : Date,
   updated_at : Date,
   created_by : { type: String, deafult: '' },
   updated_by : { type: String, deafult: '' },
});

module.exports = mongoose.model('pcfcsettled_master',settledpcfcmasterSchema);


