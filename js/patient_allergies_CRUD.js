const express = require('express');
const router = express.Router();
var db = require('../database/db-connector')

router.post('/add-patient-allergy', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let patient_id = data['patient_id'];
    let allergy_id = data['allergy_id'];
  
    // Create the query and run it on the database
    query = `INSERT INTO Patient_Allergies (Patients_patient_id, Allergies_allergies_id) VALUES (${patient_id}, ${allergy_id})`;
    db.pool.query(query, function(error, rows, fields) {
      // Check to see if there was an error
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error)
        res.sendStatus(400);
      } else {
        res.redirect('/patient_allergies');
      }
    });
  });
  router.post('/delete-patient-allergy', function(req,res,next){
    let patient_allergies_id = req.body.delete_patient_allergies_id
    let delete_patient_allergies_id= `DELETE FROM Patient_Allergies WHERE patient_allergies_id = ('${patient_allergies_id}')`;
          db.pool.query(delete_patient_allergies_id, [patient_allergies_id], function(error, rows, fields){
              if (error) {
                console.log(error);
                res.sendStatus(400);
              }
              else{              
                res.redirect('/patient_allergies');
              }
    })
  });

module.exports = router;