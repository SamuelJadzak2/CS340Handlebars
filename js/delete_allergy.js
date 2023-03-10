const express = require('express');
const router = express.Router();
var db = require('../database/db-connector')

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

module.exports = router;