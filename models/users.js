const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const UsersSchema = new Schema({
    username : { type: String, deafult: '' },
     username : { type: String, deafult: '' },
	companyname : { type: String, deafult: '' },
	email : { type: String, deafult: '' },
	phone : { type: String, deafult: '' },
	usertype : { type: String, deafult: '' },
	exposuredate : { type: String, deafult: '' },
	turnover : { type: String, deafult: '' },
	banker : { type: String, deafult: '' },
	margincharge : { type: String, deafult: '' },
	role : { type: String, deafult: '' },
    password : { type: String, deafult: '' },
    activestatus : { type: String, deafult: '' },
	created_at : Date,
	updated_at : Date,
	created_by : { type: String, deafult: '' },
	updated_by : { type: String, deafult: '' },
});

module.exports = mongoose.model('almus_users',UsersSchema);



