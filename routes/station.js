const stationController = new (require('../controllers/StationController'))();
const stationRouter = require('koa-router')({
    prefix: '/station'
});

stationRouter.get('/', stationController.stations);
stationRouter.get('/:singleStation', stationController.singleStation);
stationRouter.post('/', stationController.add_station, stationController.stations);
stationRouter.put('/:singleStation', stationController.update_station, stationController.singleStation);
stationRouter.delete('/:singleStation', stationController.delete_station, stationController.stations);

module.exports = stationRouter;