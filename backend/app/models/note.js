var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		default: null
	},

})

module.exports = mongoose.model('Note', NoteSchema);	