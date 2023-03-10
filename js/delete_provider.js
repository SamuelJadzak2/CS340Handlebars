const express = require('express');
const router = express.Router();
var db = require('../database/db-connector')

router.post('/delete-provider', function(req,res,next){
  let provider_id = req.body.delete_providerid;
  let delete_provider_id= `DELETE FROM Providers WHERE provider_id = ('${provider_id}')`;
        db.pool.query(delete_provider_id, [provider_id], function(error, rows, fields){
            if (error) {
              console.log(error);
              res.sendStatus(400);
            }
            else{              
              res.redirect('/providers');
            }
  })
});

module.exports = router;