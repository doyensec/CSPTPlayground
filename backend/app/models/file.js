var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
	content: {
		type: String,
		required: true
	},
})

module.exports = mongoose.model('File', FileSchema);	