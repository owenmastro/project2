const audiDepartmentController = new (require('../controllers/AudiDepartmentController'))();
const audiDepartmentRouter = require('koa-router')({
    prefix: '/audidepartment'
});

audiDepartmentRouter.get('/', audiDepartmentController.audi_departments);
audiDepartmentRouter.get('/:audi_department', audiDepartmentController.audi_department);
audiDepartmentRouter.post('/', audiDepartmentController.add_audiDepartment, audiDepartmentController.audi_departments);
audiDepartmentRouter.put('/:audi_department', audiDepartmentController.update_audiDepartment, audiDepartmentController.audi_department);
audiDepartmentRouter.delete('/:audi_department', audiDepartmentController.delete_audiDepartment, audiDepartmentController.audi_departments);

module.exports = audiDepartmentRouter;