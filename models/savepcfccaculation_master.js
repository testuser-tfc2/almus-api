const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const savepcfccalculationmasterSchema = new Schema({
   type :  {type: String},
   company_name :  {type: String},
   invoice_no :  {type: String},
   currency:  {type: String},
   amount_in_fc :  {type: String},
    start_date :  {type: String},
   from_date :  {type: String},
   to_date :  {type: String},
   forwardon_date:  {type: String},
   costing_spot:  {type: String},
   costing_premium:  {type: String},
    bank_margin :  {type: String},
   booking_rate:  {type: String},
     mtm_spot:  {type: String},
   mtm_premium:  {type: String},
   current_forwardrate:  {type: String}, 
   profit_loss:  {type: String},
   savecalcualtionid : { type: String },
   userid : { type: String },
   bank_name : { type: String },
   created_at : Date,
   updated_at : Date,
   created_by : { type: String, deafult: '' },
   updated_by : { type: String, deafult: '' },
});

module.exports = mongoose.model('savepcfccalculation_master',savepcfccalculationmasterSchema);



