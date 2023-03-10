const express = require('express');
const router = express.Router();
var db = require('../database/db-connector')

router.post('/add-provider', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let first_name = data['first-name'];
    let last_name = data['last-name'];
    console.log(first_name, last_name);

    // Create the query and run it on the database
    query1 = `INSERT INTO Providers (first_name, last_name) VALUES ('${first_name}', '${last_name}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else{
            res.redirect('/Providers');
        }
    });
});

module.exports = router;