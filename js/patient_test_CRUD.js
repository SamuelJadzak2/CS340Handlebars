const express = require('express');
const router = express.Router();
var db = require('../database/db-connector')


router.post('/add-patient-test', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data)
    let test_result = data['test_result'];
    let apt_date_time = data['appointment_date_time'];
    let Patients_patient_id = data['Patients_patient_id'];
    let Tests_test_id = data['Tests_test_id'];
  
    // Create the query and run it on the database
    query = `INSERT INTO Patient_Tests (test_result, test_date, Patients_patient_id, Tests_test_id) VALUES ('${test_result}', '${apt_date_time}', '${Patients_patient_id}', '${Tests_test_id}')`;
    // query = `INSERT INTO Patient_Tests (test_result, test_date) VALUES (${test_result}, '${apt_date_time}')`;

    db.pool.query(query, function(error, rows, fields) {
      // Check to see if there was an error
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error)
        res.sendStatus(400);
      } else {
        res.redirect('/patient_tests');
      }
    });
  });

  module.exports = router;