const carController = new (require('../controllers/carController'))();
const carRouter = require('koa-router')({
    prefix: '/car'
});

carRouter.get('/', carController.cars);
carRouter.get('/:car', carController.singleCar);
carRouter.post('/', carController.add_car, carController.cars);
carRouter.put('/:car', carController.update_car, carController.singleCar);
carRouter.delete('/:car', carController.delete_car, carController.cars);

module.exports = carRouter;