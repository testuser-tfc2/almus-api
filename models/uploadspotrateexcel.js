const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const spotratemasterSchema = new Schema({
		applicable_date :  {type: String},
		applicable_converdate : Date,
		spotin_usd :  {type: String},
		spotin_gbp :  {type: String},
		spotin_eur :  {type: String},
		spotin_yen :  {type: String},
		spotin_eur_usd :  {type: String},
		spotin_gbp_usd :  {type: String},
		userid : { type: String },
		created_at : Date,
		updated_at : Date,
		created_by : { type: String, deafult: '' },
		updated_by : { type: String, deafult: '' },
});

module.exports = mongoose.model('spotrate_master',spotratemasterSchema);



