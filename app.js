// apps.js
const mysql = require('mysql');
// create a connection to the db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company',
});

connection.connect((err) => {
    if(err){
        console.log('Error connection to DB');
        return;
    }
    console.log('Connection established');
});
connection.query('SELECT * FROM employees', 
(err,rows) =>{
    if(err) throw err;

    rows.forEach(row => {
        console.log(`${row.name} is in  ${row.location}`);
    });
});

// Insertion 
const employee = {
    name: 'Peter Parker',
    location: 'Switzerland'
};
connection.query('INSERT INTO employees SET?',
           employee, (err,res)=>{
               if(err) throw err;

               console.log('Last insert ID:',
               res.insertId);
           }
);

connection.query('UPDATE employees SET location= ? WHERE ID = ?', 
         ['Ethiopia', 5],
         (err, result)=>{
             if(err) throw err;
             console.log(`Changed ${result.changedRows} row(s)`);
         }
);

connection.query(' DELETE FROM employees WHERE id = ?', [5],
         (err, result) =>{
             if(err) throw err;
             console.log(`Deleted  ${result.affectedRows} row(s)`);
         }
)

connection.query('SELECT * FROM employees ORDER BY location',
       (err,result) => {
           if(err) throw err;

           console.log(result);
       }
)


connection.end((err) => {
    //The connection is terminated gracefully
    //Ensures all previously enqued queries are still
    //before sending a COM_QUIT packet to the MYSQL server
});

