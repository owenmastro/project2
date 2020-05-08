const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class customerController {
    constructor() {
        console.log('Customer Controller Initialized!');
    }
    
    // Fetches all Customers
    async customers(ctx) {
        console.log('Controller HIT: customerController::customers');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM customer';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.customer: ${err}`);
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

    // Fetches a single customer
    async singleCustomer(ctx) {
        console.log('Controller HIT: customerController::singleCustomer');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM customer WHERE customerID = ?;';
            const sc = ctx.params.singleCustomer;
            
            chpConnection.query({
                sql: query,
                values: [sc]
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

    // Add a new customer
    async add_customer(ctx, next) {
        console.log('Controller HIT: customerController::add_customer');
       return new Promise((resolve, reject) => {
           const newC = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO customer(f_name, l_name, phone, city, dept_name) VALUES (?, ?, ?, ?, ?);',
               values: [newC.f_name, newC.l_name, newC.phone, newC.city, newC.dept_name]
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

    // Update a customer
    async update_customer(ctx, next) {
        console.log('Controller HIT: customerController::update_customer');
        return new Promise((resolve, reject) => {
            const c = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE customer 
                    SET 
                        f_name = ?,
                        l_name = ?,
                        phone = ?,
                        city = ?,
                        dept_name = ?,
                    WHERE customerID = ?
                    `,
                values: [c.f_name, c.l_name, c.phone, c.city, c.dept_name, ctx.params.singleCustomer]
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

    // Delete a customer
    async delete_customer(ctx, next) {
        console.log('Controller HIT: customerController::delete_customer');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM customer WHERE customerID = ?;`,
                values: [ctx.params.singleCustomer]
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

module.exports = customerController;
