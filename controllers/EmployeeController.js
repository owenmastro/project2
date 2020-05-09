const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class EmployeeController {
    constructor() {
        console.log('Employee Controller Initialized!');
    }
    
    // Fetches all employees
    async employees(ctx) {
        console.log('Controller HIT: EmployeeController::employees');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM employee';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.employee: ${err}`);
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

    // Fetches a single employee
    async singleEmployee(ctx) {
        console.log('Controller HIT: EmployeeController::singleEmployee');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM employee WHERE SSN = ?;';
            const se = ctx.params.singleEmployee;
            
            chpConnection.query({
                sql: query,
                values: [se]
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

    // Add a new employee
    async add_employee(ctx, next) {
        console.log('Controller HIT: EmployeeController::add_employee');
       return new Promise((resolve, reject) => {
           const newE = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO employee(SSN, f_name, l_name, salary, teamNum, stationID, dept_name) VALUES (?, ?, ?, ?, ?, ?, ?);',
               values: [newE.SSN, newE.f_name, newE.l_name, newE.salary, newE.teamNum, newE.stationID, newE.dept_name]
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

    // Update an employee
    async update_employee(ctx, next) {
        console.log('Controller HIT: EmployeeController::update_employee');
        return new Promise((resolve, reject) => {
            const e = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE employee 
                    SET 
                        f_name = ?,
                        l_name = ?,
                        salary = ?,
                        teamNum = ?,
                        stationID = ?,
                        dept_name = ?
                    WHERE SSN = ?
                    `,
                values: [e.f_name, e.l_name, e.salary, e.teamNum, e.stationID, e.dept_name, ctx.params.singleEmployee]
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

    // Delete an employee
    async delete_employee(ctx, next) {
        console.log('Controller HIT: EmployeeController::delete_employee');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM employee WHERE SSN = ?;`,
                values: [ctx.params.singleEmployee]
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

module.exports = EmployeeController;
