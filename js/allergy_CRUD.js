const express = require('express');
const router = express.Router();
var db = require('../database/db-connector')
//ADD
router.post('/add-allergy', function(req, res){ 
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let allergy_input = data['input-allergyname'];
    console.log(allergy_input)
    // Create the query and run it on the database
    query1 = `INSERT INTO Allergies (allergy_name) VALUES ('${allergy_input}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else{
            res.redirect('/Allergies');
        }
    });
});
//DELETE
router.post('/delete-allergy', function(req,res,next){
    let allergy_id = req.body.delete_allergyid;
    let delete_allergy_id= `DELETE FROM Allergies WHERE allergies_id = ('${allergy_id}')`;
          db.pool.query(delete_allergy_id, [allergy_id], function(error, rows, fields){
              if (error) {
                console.log(error);
                res.sendStatus(400);
              }
              else{              
                res.redirect('/Allergies');
              }
    })
  });
//UPDATE
router.post('/update-allergy', function(req,res,next){
  let allergy_id = req.body.update_allergyid;
  let updated_allergy_name = req.body.update_allergyname;
  let update_query = `UPDATE Allergies SET allergy_name = '${updated_allergy_name}' WHERE allergies_id = '${allergy_id}'`;
  db.pool.query(update_query, function(error, rows, fields){
      if (error) {
          console.log(error);
          res.sendStatus(400);
      }
      else{              
          res.redirect('/Allergies');
      }
    })
  });
  
module.exports = router;