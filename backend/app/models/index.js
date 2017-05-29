const mongoose = require('mongoose');
const config = require('../../config/database');


mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
const dbUrl = `mongodb://${config.username}:${process.env.DATABASE_PASSWORD}@${config.host}/${config.database}`;
mongoose.connect(dbUrl);

module.exports = db;