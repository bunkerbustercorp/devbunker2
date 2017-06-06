const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Post = new Schema({
    title: String,
    content: String,
    releaseDate: {
        type: Date,
        default: Date.now
    },
    userId: String,
    isTemp: {
        type: Boolean,
        default: true
    }
});

Post.statics.findById = function(id) {
    const IdString = `ObjectId(${id}`;

    return this.findOne({ '_id': IdString}).exec();
}

Post.statics.findByUsername = function(username) {
    return this.findOne({ 'username': username}).exec();
}

Post.statics.findByEmail = function(email) {
    return this.findOne({ 'email': email}).exec();
}

module.exports = mongoose.model('Post', Post);