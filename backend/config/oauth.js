const environment = require('./environment');

const url = environment[process.env.NODE_ENV].url;


module.exports = {
    google: {
        appId: '981765274313-v4pla2sng69nnv7m2k0jaapoch830j3n.apps.googleusercontent.com',
        appSecret: process.env.GOOGLE_SECRET,
        callbackURL: url + '/api/auth/google/callback'
    },
    facebook: {
        appId: '939690429505200',
        appSecret: process.env.FACEBOOK_SECRET,
        callbackURL: url + '/api/auth/facebook/callback'
    },
    github: {
        appId: '7f098bda3b3dcd3f97a5',
        appSecret: process.env.GITHUB_SECRET,
        callbackURL: url + '/api/auth/github/callback'
    }
}