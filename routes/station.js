const stationController = new (require('../controllers/stationController'))();
const stationRouter = require('koa-router')({
    prefix: '/station'
});

stationRouter.get('/', stationController.stations);
stationRouter.get('/:station', stationController.singleStation);
stationRouter.post('/', stationController.add_station, stationController.stations);
stationRouter.put('/:station', stationController.update_station, stationController.singleStation);
stationRouter.delete('/:station', stationController.delete_station, stationController.stations);

module.exports = stationRouter;