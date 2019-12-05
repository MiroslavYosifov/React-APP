const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const commentSchema = new Schema({
    title: { type: String, unique: true, required: true },
    content: { type: String, require: true },
    createdDate: { type: Date, default: Date.now, required: true},
    creator: { type: String, unique: true, required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    recipe: { type: mongoose.Types.ObjectId, ref: 'Recipe' },
});


module.exports = new Model('Comment', commentSchema);
