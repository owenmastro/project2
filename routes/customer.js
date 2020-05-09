const customerController = new (require('../controllers/CustomerController'))();
const customerRouter = require('koa-router')({
    prefix: '/customer'
});

customerRouter.get('/', customerController.customers);
customerRouter.get('/:singleCustomer', customerController.singleCustomer);
customerRouter.post('/', customerController.add_customer, customerController.customers);
customerRouter.put('/:singleCustomer', customerController.update_customer, customerController.singleCustomer);
customerRouter.delete('/:singleCustomer', customerController.delete_customer, customerController.customers);

module.exports = customerRouter;