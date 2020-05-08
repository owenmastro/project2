const employeeController = new (require('../controllers/employeeController'))();
const employeeRouter = require('koa-router')({
    prefix: '/employee'
});

employeeRouter.get('/', employeeController.employees);
employeeRouter.get('/:car', employeeController.singleEmployee);
employeeRouter.post('/', employeeController.add_employee, employeeController.employees);
employeeRouter.put('/:car', employeeController.update_employee, employeeController.singleEmployee);
employeeRouter.delete('/:car', employeeController.delete_employee, employeeController.employees);

module.exports = employeeRouter;