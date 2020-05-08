const audiDepartmentController = new (require('../controllers/audiDepartmentController'))();
const audiDepartmentRouter = require('koa-router')({
    prefix: '/audidepartment'
});

audiDepartmentRouter.get('/', audiDepartmentController.audi_departments);
audiDepartmentRouter.get('/:audidepartment', audiDepartmentController.audi_department);
audiDepartmentRouter.post('/', audiDepartmentController.add_audiDepartment, audiDepartmentController.audi_departments);
audiDepartmentRouter.put('/:audidepartment', audiDepartmentController.update_audiDepartment, audiDepartmentController.audi_department);
audiDepartmentRouter.delete('/:audidepartment', audiDepartmentController.delete_audiDepartment, audiDepartmentController.audi_departments);

module.exports = audiDepartmentRouter;