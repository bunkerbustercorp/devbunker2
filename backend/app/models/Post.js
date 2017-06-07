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

Post.statics.findByUserId = function(userId) {
    return this.find({'userId': userId}).exec();
}
module.exports = mongoose.model('Post', Post);