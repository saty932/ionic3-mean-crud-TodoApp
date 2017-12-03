// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var TodoSchema = new Schema({
	todoHeading:{
		type:String
	},
	todoData:{
		type:String
	}
});
// we need to create a model using it
var Todo = mongoose.model('Todo', TodoSchema);
// make this available to our users in our Node applications
module.exports = Todo;