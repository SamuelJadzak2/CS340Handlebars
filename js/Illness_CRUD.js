const express = require('express');
const router = express.Router();
var db = require('../database/db-connector')

router.post('/add-illness', function(req, res){ 
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let illness_input = data['input-illnessname'];
    console.log(illness_input)
    // Create the query and run it on the database
    query1 = `INSERT INTO Illnesses (illness_name) VALUES ('${illness_input}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else{
            res.redirect('/Illnesses');
        }
    });
});

router.post('/delete-illness', function(req,res,next){
    let illness_id = req.body.delete_illnessid;
    let delete_illness_id= `DELETE FROM Illnesses WHERE illness_id = ('${illness_id}')`;
          db.pool.query(delete_illness_id, [illness_id], function(error, rows, fields){
              if (error) {
                console.log(error);
                res.sendStatus(400);
              }
              else{              
                res.redirect('/Illnesses');
              }
    })
  });

router.post('/update-illness', function(req,res,next){
  let illness_id = req.body.update_illnessid;
  let updated_illness_name = req.body.update_illnessname;
  let update_query = `UPDATE Illnesses SET illness_name = '${updated_illness_name}' WHERE illness_id = '${illness_id}'`;
  db.pool.query(update_query, function(error, rows, fields){
      if (error) {
          console.log(error);
          res.sendStatus(400);
      }
      else{              
          res.redirect('/Illnesses');
      }
    })
  });


module.exports = router;