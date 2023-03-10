const express = require('express');
const router = express.Router();
var db = require('../database/db-connector')

router.post('/add-procedure', function(req, res){ 
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let procedure_input = data['input-procedurename'];
    console.log(procedure_input)
    // Create the query and run it on the database
    query1 = `INSERT INTO Procedures (procedure_name) VALUES ('${procedure_input}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else{
            res.redirect('/procedures');
        }
    });
});

module.exports = router;