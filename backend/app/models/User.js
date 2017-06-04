const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var User = new Schema({
    username: String,
    displayName: String,
    socialId: {
        facebook: String,
        google: String,
        github: String
    },
    email: String,
    thumbnail: String
});

User.statics.findByOAuth = function(provider, socialId) {
    const idString = `socialId.${provider}`;

    return this.findOne({ [idString]: socialId}).exec();
}

User.statics.findByUsername = function(username) {
    return this.findOne({ 'username': username}).exec();
}

User.statics.findByEmail = function(email) {
    return this.findOne({ 'email': email}).exec();
}

User.statics.updateSocialId = function(provider, socialId) {
    this.socialId[provider] = socialId
    return this.save();
}

module.exports = mongoose.model('User', User);