const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const recipeSchema = new Schema({
    title: { type: String, unique: true, required: true },
    createdDate: { type: Date, default: Date.now, required: true},
    imageUrl: { type: String, require: true, required: true },
    preparation: { type: String, require: true, required: true },
    ingredients: { type: String, require: true, required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
    creator: { type: mongoose.Types.ObjectId, ref: 'User' },
    likes: { type: Number, default: 0 },
    isCreator: { type: Boolean, default: false },
    isFavorite: { type: Boolean, default: false }
});


module.exports = new Model('Recipe', recipeSchema);
