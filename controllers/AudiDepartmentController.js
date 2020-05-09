const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class AudiDepartmentController {
    constructor() {
        console.log('AudiDepartment Controller Initialized!');
    }
    
    // Fetches all Audi Departments
    async audi_departments(ctx) {
        console.log('Controller HIT: AudiDepartmentController::audi_departments');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM audiDepartment';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.audiDepartment: ${err}`);
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

    // Fetches a single Audi Department
    async audi_department(ctx) {
        console.log('Controller HIT: AudiDepartmentController::audi_department');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM audiDepartment WHERE dept_name = ?;';
            const ad = ctx.params.audi_department;
            
            chpConnection.query({
                sql: query,
                values: [ad]
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

    // Add a new Audi Department
    async add_audiDepartment(ctx, next) {
        console.log('Controller HIT: AudiDepartmentController::add_audiDepartment');
       return new Promise((resolve, reject) => {
           const newAD = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO audiDepartment(dept_name, city, street, state) VALUES (?, ?, ?, ?);',
               values: [newAD.dept_name, newAD.city, newAD.street, newAD.state]
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

    // Update an Audi Department
    async update_audiDepartment(ctx, next) {
        console.log('Controller HIT: AudiDepartmentController::update_audiDepartment');
        return new Promise((resolve, reject) => {
            const ad = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE audiDepartment 
                    SET 
                        city = ?,
                        street = ?,
                        state = ?
                    WHERE dept_name = ?
                    `,
                values: [ad.city, ad.street, ad.state, ctx.params.audi_department]
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

    // Delete an Audi Department
    async delete_audiDepartment(ctx, next) {
        console.log('Controller HIT: AudiDepartmentController::delete_audiDepartment');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM audiDepartment WHERE dept_name = ?;`,
                values: [ctx.params.audi_department]
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

module.exports = AudiDepartmentController;
