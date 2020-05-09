const employeeController = new (require('../controllers/EmployeeController'))();
const employeeRouter = require('koa-router')({
    prefix: '/employee'
});

employeeRouter.get('/', employeeController.employees);
employeeRouter.get('/:singleEmployee', employeeController.singleEmployee);
employeeRouter.post('/', employeeController.add_employee, employeeController.employees);
employeeRouter.put('/:singleEmployee', employeeController.update_employee, employeeController.singleEmployee);
employeeRouter.delete('/:singleEmployee', employeeController.delete_employee, employeeController.employees);

module.exports = employeeRouter;