const express = require('express');
const router = express.Router();
var db = require('../database/db-connector')

router.post('/delete-procedure', function(req,res,next){
  let procedure_id = req.body.delete_procedureid;
  let delete_procedure_id= `DELETE FROM Procedures WHERE procedure_id = ('${procedure_id}')`;
        db.pool.query(delete_procedure_id, [procedure_id], function(error, rows, fields){
            if (error) {
              console.log(error);
              res.sendStatus(400);
            }
            else{              
              res.redirect('/procedures');
            }
  })
});

module.exports = router;