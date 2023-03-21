const express = require('express');
const router = express.Router();
var db = require('../database/db-connector')


router.post('/add-appointment', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let patient_id = data['patient_id'];
    let provider = data['provider'];
    let datetime = data['datetime'];
  
    // Create the query and run it on the database
    query = `INSERT INTO Appointments (patient_id, provider, datetime) VALUES (${patient_id}, '${provider}', '${datetime}')`;
    db.pool.query(query, function(error, rows, fields) {
      // Check to see if there was an error
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error)
        res.sendStatus(400);
      } else {
        res.redirect('/appointments');
      }
    });
  });

  module.exports = router;