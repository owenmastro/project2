const carController = new (require('../controllers/CarController'))();
const carRouter = require('koa-router')({
    prefix: '/car'
});

carRouter.get('/', carController.cars);
carRouter.get('/:singleCar', carController.singleCar);
carRouter.post('/', carController.add_car, carController.cars);
carRouter.put('/:singleCar', carController.update_car, carController.singleCar);
carRouter.delete('/:singleCar', carController.delete_car, carController.cars);

module.exports = carRouter;