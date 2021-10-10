const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Todos = new Schema({
    id: ObjectId,
    message: String,
    completed: Boolean,
});

let model = mongoose.model('Todos', Todos);

module.exports = model;