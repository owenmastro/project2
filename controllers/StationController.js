const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class StationController {
    constructor() {
        console.log('Station Controller Initialized!');
    }
    
    // Fetches all stations
    async stations(ctx) {
        console.log('Controller HIT: StationController::stations');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM station';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.station: ${err}`);
                }
                
                ctx.body = res;
                ctx.status = 200;
                
                resolve();
            });
        })
	    .catch(err => {
		ctx.status = 500;
		ctx.body = err;
            });
    }

    // Fetches a single station
    async singleStation(ctx) {
        console.log('Controller HIT: StationController::singleStation');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM station WHERE stationID = ?;';
            const ss = ctx.params.singleStation;
            
            chpConnection.query({
                sql: query,
                values: [ss]
            }, (err, res) => {
                if(err) {
                    reject(err);
                } 

                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
         });
    }

    // Add a new station
    async add_station(ctx, next) {
        console.log('Controller HIT: StationController::add_station');
       return new Promise((resolve, reject) => {
           const newS = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO station(stationID, task, dept_name) VALUES (?, ?, ?);',
               values: [newS.stationID, newS.task, newS.dept_name]
           }, (err, res) => {
               if(err) {
                   reject(err);
               }

               resolve();
           });
           
       })
        .then(await next)
        .catch(err => {
           ctx.status = 500;
           ctx.body = {
               error: `Internal Server Error: ${err}`,
               status: 500
           };
       });
    }

    // Update a station
    async update_station(ctx, next) {
        console.log('Controller HIT: StationController::update_station');
        return new Promise((resolve, reject) => {
            const s = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE station 
                    SET 
                        task = ?,
                        dept_name = ?
                    WHERE stationID = ?
                    `,
                values: [s.task, s.dept_name, ctx.params.singleStation]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }

                resolve();
            });
        })
         .then(await next)
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    // Delete a station
    async delete_station(ctx, next) {
        console.log('Controller HIT: StationController::delete_station');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM station WHERE stationID = ?;`,
                values: [ctx.params.singleStation]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        })
        .then(await next)
        .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }
}

module.exports = StationController;
