// App.js

/*
    SETUP
*/
var db = require('./database/db-connector')
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 9864;                 // Set a port number at the top so it's easy to change in the future

// handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
// app.js 
app.get('/', function(req, res)
    {
        res.render('home')
    }); 

app.get('/Appointments', function(req, res)
    {
        let query1 = "SELECT * FROM Appointments";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('appointments', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query                                       // will process this file, before sending the finished HTML to the client.

app.get('/Patients', function(req, res){
    let query1 = "SELECT * FROM Patients";

    db.pool.query(query1, function(error, rows, feilds){
        res.render('patients', {data:rows});
    })
});

app.get('/Allergies', function(req, res){
    let query1 = "SELECT * FROM Allergies";

    db.pool.query(query1, function(error, rows, feilds){
        res.render('allergies', {data:rows});
    })
});

app.get('/Illnesses', function(req, res){
    let query1 = "SELECT * FROM Illnesses";

    db.pool.query(query1, function(error, rows, feilds){
        res.render('illnesses', {data:rows});
    })
});

app.get('/Patient_Procedures', function(req, res){
    let query1 = "SELECT * FROM Patient_Procedures";

    db.pool.query(query1, function(error, rows, feilds){
        res.render('patient_procedures', {data:rows});
    })
});

app.get('/Patient_Allergies', function(req, res){
    let query1 = "SELECT * FROM Patient_Allergies";

    db.pool.query(query1, function(error, rows, feilds){
        res.render('patient_allergies', {data:rows});
    })
});

app.get('/Patient_Illnesses', function(req, res){
    let query1 = "SELECT * FROM Patient_illnesses";

    db.pool.query(query1, function(error, rows, feilds){
        res.render('patient_illnesses', {data:rows});
    })
});

app.get('/Patient_Tests', function(req, res){
    let query1 = "SELECT * FROM Patient_Tests";

    db.pool.query(query1, function(error, rows, feilds){
        res.render('patient_tests', {data:rows});
    })
});
app.get('/Prescriptions', function(req, res){
    let query1 = "SELECT * FROM Prescriptions";

    db.pool.query(query1, function(error, rows, feilds){
        res.render('prescriptions', {data:rows});
    })
});
app.get('/Procedures', function(req, res){
    let query1 = "SELECT * FROM Procedures";

    db.pool.query(query1, function(error, rows, feilds){
        res.render('procedures', {data:rows});
    })
});
app.get('/Providers', function(req, res){
    let query1 = "SELECT * FROM Providers";

    db.pool.query(query1, function(error, rows, feilds){
        res.render('providers', {data:rows});
    })
});
app.get('/Tests', function(req, res){
    let query1 = "SELECT * FROM Tests";

    db.pool.query(query1, function(error, rows, feilds){
        res.render('tests', {data:rows});
    })
});


// POST ROUTES

app.post('/add-allergy', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let allergy_input = data['input-allergyname'];
    console.log(allergy_input)

    // // Capture NULL values
    // let name = data['input-allergyname'];
    // if (isNaN(name))
    // {
    //     name = 'NULL'
    // }

    // Create the query and run it on the database
    query1 = `INSERT INTO Allergies (allergy_name) VALUES ('${allergy_input}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Allergies;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.redirect('/Allergies');
                }
            })
        }
    })
});

//// DELETE ROUTES

app.delete('/delete-allergy', function(req,res,next){
    //console.log("inside the DA function")
    let data = req.body;
    console.log(data.id)
    let allergy_id = parseInt(data.id);
    let delete_allergy_id= `DELETE FROM Allergies WHERE allergies_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(delete_allergy_id, [allergy_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              console.log('success');
            res.redirect('/');
  })});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});