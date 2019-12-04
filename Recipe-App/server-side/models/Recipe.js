const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const recipeSchema = new Schema({
    title: { type: String, unique: true, required: true },
    products: { type: String, require: true, required: true },
    imageUrl: { type: String, require: true, required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
    user: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});


module.exports = new Model('Recipe', recipeSchema);
