const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const settledmasterSchema = new Schema({
   type :  {type: String},
   cunter_party_name :  {type: String},
   invoice_no :  {type: String},
   currency:  {type: String},
   amount_in_fc :  {type: String},
   start_date :  {type: String},
   start_date_convert : Date,
   due_date :  {type: String},
   previous_spot:  {type: String},
   previous_premium:  {type: String},
   costed_rate:  {type: String},
   current_spot:  {type: String},
   current_premium:  {type: String},
   current_forwardrate:  {type: String},
   profit_loss:  {type: String},
    remark:  {type: String},
    forwardon_date:  {type: String},
   settledid : { type: String },
   userid : { type: String },
   created_at : Date,
   updated_at : Date,
   created_by : { type: String, deafult: '' },
   updated_by : { type: String, deafult: '' },
});

module.exports = mongoose.model('settled_master',settledmasterSchema);



