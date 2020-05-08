const audiDepartmentRouter = require('./audiDepartment');
const carRouter = require('./car');
const customerRouter = require('./customer');
const employeeRouter = require('./employee');
const stationRouter = require('./station');
const defaultRouter = require('koa-router')({
    prefix: '/api'
});

defaultRouter.get('/', ctx => {
    ctx.status = 200;
    ctx.body = "Default Route Found!";
});

defaultRouter.use(
    audiDepartmentRouter.routes(),
    carRouter.routes(),
    customerRouter.routes(),
    employeeRouter.routes(),
    stationRouter.routes(),
);

module.exports = api => {
    api.use(defaultRouter.routes());
};