const express = require('express');
const router = express.Router();
var db = require('../database/db-connector')

router.post('/add-prescription', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let description = data['description'];
    let patient_id = data['patient_id'];
  
    console.log(description, patient_id);
  
    // Create the query and run it on the database
    let query = `INSERT INTO Prescriptions (desciption, Patients_patient_id) 
                VALUES ('${description}', '${patient_id}')`;
    db.pool.query(query, function(error, rows, fields) {
      // Check to see if there was an error
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error)
        res.sendStatus(400);
      } else {
        res.redirect('/Prescriptions');
      }
    });
  });

  router.post('/delete-prescription', function(req,res,next){
    let prescription_id = req.body.delete_prescriptionid;
    let delete_prescription_id= `DELETE FROM Prescriptions WHERE prescription_id = ('${prescription_id}')`;
          db.pool.query(delete_prescription_id, [prescription_id], function(error, rows, fields){
              if (error) {
                console.log(error);
                res.sendStatus(400);
              }
              else{              
                res.redirect('/Prescriptions');
              }
    })
  });

module.exports = router;