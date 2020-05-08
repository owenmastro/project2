const customerController = new (require('../controllers/customerController'))();
const customerRouter = require('koa-router')({
    prefix: '/customer'
});

customerRouter.get('/', customerController.customers);
customerRouter.get('/:customer', customerController.singleCustomer);
customerRouter.post('/', customerController.add_customer, customerController.customers);
customerRouter.put('/:customer', customerController.update_customer, customerController.singleCustomer);
customerRouter.delete('/:customer', customerController.delete_customer, customerController.customers);

module.exports = customerRouter;