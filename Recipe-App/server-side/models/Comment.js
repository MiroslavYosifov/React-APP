const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const commentSchema = new Schema({
    title: { type: String, unique: true, required: true },
    content: { type: String, require: true },
});


module.exports = new Model('Comment', commentSchema);
