const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const commentSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, require: true },
    createdDate: { type: Date, default: Date.now, required: true},
    creator: { type: String, required: true },
    recipe: { type: mongoose.Types.ObjectId, ref: 'Recipe' },
    // user: { type: mongoose.Types.ObjectId, ref: 'User' },
});


module.exports = new Model('Comment', commentSchema);
