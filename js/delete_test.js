const express = require('express');
const router = express.Router();
var db = require('../database/db-connector')

router.post('/delete-test', function(req,res,next){
  let test_id = req.body.delete_testid;
  let delete_test_id= `DELETE FROM Tests WHERE test_id = ('${test_id}')`;
        db.pool.query(delete_test_id, [test_id], function(error, rows, fields){
            if (error) {
              console.log(error);
              res.sendStatus(400);
            }
            else{              
              res.redirect('/Tests');
            }
  })
});

module.exports = router;