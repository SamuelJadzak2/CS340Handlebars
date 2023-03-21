const express = require('express');
const router = express.Router();
var db = require('../database/db-connector')


router.post('/add-appointment', function(req, res) {
  let data = req.body;
  let patient_id = data['patient_id'];
  let provider_id = data['provider_id'];
  let appointment_date_time = data['appointment_date_time'];

  let query;
  if (provider_id === "") {
    query = `INSERT INTO Appointments (Patients_patient_id, Providers_provider_id, appointment_date_time) VALUES (?, ?, ?)`;
    db.pool.query(query, [patient_id, null, appointment_date_time], function(error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.redirect('/appointments');
      }
    });
  } else {
    query = `INSERT INTO Appointments (Patients_patient_id, Providers_provider_id, appointment_date_time) VALUES (${patient_id}, ${provider_id}, '${appointment_date_time}')`;
    db.pool.query(query, function(error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.redirect('/appointments');
      }
    });
  }
});

router.post('/delete-appointment', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let appointment_id = data['delete_appointment_id'];
  
    // Create the query and run it on the database
    query = `DELETE FROM Appointments WHERE appointment_id = ${appointment_id}`;
    db.pool.query(query, function(error, rows, fields) {
      // Check to see if there was an error
      if (error) {
        // Log the error to the terminal so we know what went wrong
        console.log(error)
        res.sendStatus(400);
      } else {
        res.redirect('/appointments');
      }
    });
});

router.post('/update-appointment', function(req, res) {

  let data = req.body;
  let appointment_id = data['appointment_id'];
  let patient_id = data['patient_id2'];
  let provider_id = data['provider_id2'];
  let appointment_date_time = data['appointment_date_time2'];

  let query;
  if (provider_id === "") {
    query = `UPDATE Appointments SET Patients_patient_id = ?, Providers_provider_id = NULL, appointment_date_time = ? WHERE appointment_id = ?`;
    db.pool.query(query, [patient_id, appointment_date_time, appointment_id], function(error, results, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.redirect('/appointments');
      }
    });
  } else {
    query = `UPDATE Appointments SET Patients_patient_id = ${patient_id}, Providers_provider_id = ${provider_id}, appointment_date_time = '${appointment_date_time}' WHERE appointment_id = ${appointment_id}`;
    db.pool.query(query, function(error, rows, fields) {
      // Check to see if there was an error
      if (error) {
        // Log the error to the terminal so we know what went wrong
        console.log(error)
        res.sendStatus(400);
      } else {
        res.redirect('/appointments');
      }
    });
  }
});

  module.exports = router;