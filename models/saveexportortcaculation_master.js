const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const saveexportcalculationmasterSchema = new Schema({
   type :  {type: String},
   invoice_no :  {type: String},
   currency:  {type: String},
   cunter_party_name :  {type: String},
   amount_in_fc :  {type: String},
   start_date :  {type: String},
   due_date :  {type: String},
   forwardon_date:  {type: String},
   costing_spot:  {type: String},
   costing_premium:  {type: String},
   costed_rate:  {type: String},
   mtm_spot:  {type: String},
   mtm_premium:  {type: String},
   current_forwardrate:  {type: String}, 
   profit_loss:  {type: String},
   savecalcualtionid : { type: String },
   userid : { type: String },
   created_at : Date,
   updated_at : Date,
   created_by : { type: String, deafult: '' },
   updated_by : { type: String, deafult: '' },
});

module.exports = mongoose.model('saveexportcalculation_master',saveexportcalculationmasterSchema);


