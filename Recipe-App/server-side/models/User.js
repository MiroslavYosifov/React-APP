const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, require: true },
    profileImage: { type: String, default: 'http://josephcorporation.org/wp-content/themes/remould/images/noimage-team.png' },
    // comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
    recipes: [{ type: mongoose.Types.ObjectId, ref: 'Recipe' }],
    likedRecipes: [{ type: mongoose.Types.ObjectId, ref: 'Recipe' }],
});

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

module.exports = new Model('User', userSchema);