const http = require("http");

const Koa = require("koa");
const koaJson = require('koa-json');
const bodyParser = require('koa-bodyparser');

const defaultRoute = require('./routes/default');

const API_PORT = 8046;

const api = new Koa();

api.use(bodyParser());
api.use(koaJson());

defaultRoute(api);

http.createServer(api.callback()).listen(API_PORT);
