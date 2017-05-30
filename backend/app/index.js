// 환경변수 설정
require('dotenv').config();

// Koa 관련 모듈 로드
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// DB 모듈 로드
const mongoose = require('mongoose');

// 라우터
const api = require('./api');

// Koa 인스턴스 생성
const app = new Koa();

// body-parser 적용
app.use(bodyParser());

// 라우터 설정
const router = new Router();

router.use('/api', api.routes());

app.use(router.routes());
app.use(router.allowedMethods());

const config = require('../config/database');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
const dbUrl = `mongodb://${config.username}:${process.env.DATABASE_PASSWORD}@${config.host}/${config.database}`;

mongoose.connect(dbUrl);

app.listen(4000);