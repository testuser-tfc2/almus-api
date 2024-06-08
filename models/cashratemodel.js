const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const cashratereportmasterSchema = new Schema({
      type :  {type: String},
      date :  {type: String},
      currency:  {type: String},
      amount_in_fc :  {type: String},
      bank_name :  {type: String},
      spot_rate :  {type: String},
      cash_spot :  {type: String},
      bank_margin :  {type: String},
      net_rate:  {type: String},
      rbi_ref_rate:  {type: String},
      cash_spot_margin:  {type: String},
      net_ref_rate:  {type: String},
      gain_loss:  {type: String},
      userid : { type: String },
      created_at : Date,
      updated_at : Date,
      created_by : { type: String, deafult: '' },
      updated_by : { type: String, deafult: '' },
});

module.exports = mongoose.model('cashratereport_master',cashratereportmasterSchema);



