const express = require('express');
const router = express.Router();
var db = require('../database/db-connector')

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

module.exports = router;