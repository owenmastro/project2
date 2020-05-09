const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class CarController {
    constructor() {
        console.log('Car Controller Initialized!');
    }
    
    // Fetches all cars
    async cars(ctx) {
        console.log('Controller HIT: CarController::cars');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM car';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.car: ${err}`);
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

    // Fetches a single car
    async singleCar(ctx) {
        console.log('Controller HIT: CarController::singleCar');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM car WHERE tag_num = ?;';
            const c = ctx.params.singleCar;
            
            chpConnection.query({
                sql: query,
                values: [c]
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

    // Add a new team
    async add_car(ctx, next) {
        console.log('Controller HIT: CarController::add_car');
       return new Promise((resolve, reject) => {
           const newC = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO car(model, model_yaer) VALUES (?, ?);',
               values: [newC.model, newC.model_year]
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

    // Update a team
    async update_car(ctx, next) {
        console.log('Controller HIT: CarController::update_car');
        return new Promise((resolve, reject) => {
            const c = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE car 
                    SET 
                        model = ?,
                        model_year = ?
                    WHERE tag_num = ?
                    `,
                values: [c.model, c.model_year, ctx.params.singleCar]
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

    // Delete a team
    async delete_car(ctx, next) {
        console.log('Controller HIT: CarController::delete_car');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM car WHERE tag_num = ?;`,
                values: [ctx.params.singleCar]
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

module.exports = CarController;
