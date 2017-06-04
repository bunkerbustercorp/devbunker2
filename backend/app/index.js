// 환경변수 설정
require('dotenv').config();

// Koa 관련 모듈 로드
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwtMiddleware =require('./middlewares/jwt');

// GraphQL 관련
const graphqlKoa = require('graphql-server-koa').graphqlKoa;
const graphiqlKoa = require('graphql-server-koa').graphiqlKoa;
const Schema = require('./graphql');

// DB 모듈 로드
const mongoose = require('mongoose');

// 라우터
const api = require('./api');

// Koa 인스턴스 생성
const app = new Koa();

const config = require('../config/database');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
const dbUrl = `mongodb://${config.username}:${process.env.DATABASE_PASSWORD}@${config.host}/${config.database}`;

// body-parser 적용
app.use(bodyParser());
app.use(jwtMiddleware);

// 라우터 설정
const router = new Router();

router.use('/api', api.routes());

// GraphQL 적용 (아폴로)
const graphqlHandler = graphqlKoa(ctx => ({ schema: Schema, context: ctx }))
router.post('/graphql', graphqlHandler);
router.get('/graphql', graphqlHandler);
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());

mongoose.connect(dbUrl);

app.listen(4000);