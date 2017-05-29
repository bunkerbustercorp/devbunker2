// 환경변수 설정
require('dotenv').config();

// Koa 관련 모듈 로드
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 라우터
const api = require('./api');

// Koa 인스턴스 생성
const app = new Koa();

// 데이터베이스 연결
const models = require('./models');

// body-parser 적용
app.use(bodyParser());

// 라우터 설정
const router = new Router();

router.use('/api', api.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(4000);