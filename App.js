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
        let query1 = "SELECT * FROM Appointments"; // Define our query

        db.pool.query(query1, function(error, rows, fields){ // Execute the query

            res.render('appointments', {data: rows}); // Render the index.hbs file, and also send the renderer
        }) // an object where 'data' is equal to the 'rows' we
    });// received back from the query                                       
    // will process this file, before sending the finished HTML to the client.

app.get('/Patients', function(req, res){
    let query1 = "SELECT * FROM Patients";

    db.pool.query(query1, function(error, rows, fields){
        res.render('patients', {data:rows});
    })
});

app.get('/Allergies', function(req, res) {
    // console.log('get /Allergies');
    let query1;
    if (req.query.allergyname === undefined) {
      query1 = "SELECT * FROM Allergies";
    } 
    else {
      query1 = `SELECT * FROM Allergies WHERE allergy_name LIKE '%${req.query.allergyname}%'`;
    }
    db.pool.query(query1, function(error, rows, fields){  
        return res.render('allergies', {data: rows});
    })
});

app.get('/Illnesses', function(req, res){
    let query1 = "SELECT * FROM Illnesses";

    db.pool.query(query1, function(error, rows, fields){
        res.render('illnesses', {data:rows});
    })
});

app.get('/Patient_Procedures', function(req, res){
    let query1 = "SELECT * FROM Patient_Procedures";

    db.pool.query(query1, function(error, rows, fields){
        res.render('patient_procedures', {data:rows});
    })
});

// app.get('/Patient_Allergies', function(req, res){
//     // let query1 = "SELECT * FROM Patient_Allergies";
//     let query1 = "SELECT pa.patient_allergies_id, pa.Patients_patient_id, pa.Allergies_allergies_id, a.allergy_name, p.first_name, p.last_name FROM Patient_Allergies pa JOIN Allergies a ON pa.Allergies_allergies_id=a.allergies_id JOIN Patients p ON pa.Patients_patient_id = p.patient_id";

//     db.pool.query(query1, function(error, rows, fields){
//         res.render('patient_allergies', {data:rows});
//     })
// });
// Display the patient allergies page
// Display the patient allergies page
// Display the patient allergies page
app.get('/patient_allergies', function(req, res){
    // Query the database to get the list of patient allergies
    // let query1 = "SELECT pa.patient_allergies_id, pa.Patients_patient_id, pa.Allergies_allergies_id, a.allergy_name, CONCAT(p.first_name, ' ', p.last_name) AS patient_name FROM Patient_Allergies pa JOIN Allergies a ON pa.Allergies_allergies_id=a.allergies_id JOIN Patients p ON pa.Patients_patient_id = p.patient_id";
    let query1 = "SELECT pa.patient_allergies_id, pa.Patients_patient_id, pa.Allergies_allergies_id, a.allergy_name, p.first_name, p.last_name FROM Patient_Allergies pa JOIN Allergies a ON pa.Allergies_allergies_id=a.allergies_id JOIN Patients p ON pa.Patients_patient_id = p.patient_id";
    db.pool.query(query1, function(error, rows, fields){
      if (error) {
        console.log(error);
      }
      else {
        // Query the database to get the list of patients
        let query2 = "SELECT * FROM Patients";
        db.pool.query(query2, function(error, patients, fields) {
          if (error) {
            console.log(error);
          }
          else {
            // Query the database to get the list of allergies
            let query3 = "SELECT * FROM Allergies";
            db.pool.query(query3, function(error, allergies, fields) {
              if (error) {
                console.log(error);
              }
              else {
                // Render the patient allergies page with the data
                res.render('patient_allergies', {
                  data:rows,
                  patients:patients,
                  allergies:allergies
                });
              }
            });
          }
        });
      }
    });
  });
app.get('/Patient_Illnesses', function(req, res){
    let query1 = "SELECT * FROM Patient_illnesses";

    db.pool.query(query1, function(error, rows, fields){
        res.render('patient_illnesses', {data:rows});
    })
});

app.get('/Patient_Tests', function(req, res){
    let query1 = "SELECT * FROM Patient_Tests";

    db.pool.query(query1, function(error, rows, fields){
        res.render('patient_tests', {data:rows});
    })
});
app.get('/Prescriptions', function(req, res){
    let query1 = "SELECT * FROM Prescriptions";

    db.pool.query(query1, function(error, rows, fields){
        res.render('prescriptions', {data:rows});
    })
});
app.get('/Procedures', function(req, res){
    let query1 = "SELECT * FROM Procedures";

    db.pool.query(query1, function(error, rows, fields){
        res.render('procedures', {data:rows});
    })
});
app.get('/Providers', function(req, res){
    let query1 = "SELECT * FROM Providers";

    db.pool.query(query1, function(error, rows, fields){
        res.render('providers', {data:rows});
    })
});
app.get('/Tests', function(req, res){
    let query1 = "SELECT * FROM Tests";

    db.pool.query(query1, function(error, rows, fields){
        res.render('tests', {data:rows});
    })
});

//ADD ALL JS FILES HERE
//ALLERGY PAGE
const allergy_CRUD = require('./js/allergy_CRUD.js')
app.use('/', allergy_CRUD)
//TEST PAGE
const add_test = require('./js/add_test.js')
app.use('/', add_test)
const delete_test= require('./js/delete_test.js')
app.use('/', delete_test)
//PROVIDER PAGE
const add_provider = require('./js/add_provider.js')
app.use('/', add_provider)
const delete_provider= require('./js/delete_provider.js')
app.use('/', delete_provider)
//PROCEDURE PAGE
const procedure_CRUD= require('./js/procedure_CRUD.js')
app.use('/', procedure_CRUD)
//ILLNESS PAGE
const illness_CRUD = require('./js/Illness_CRUD.js')
app.use('/', illness_CRUD)
const patient_allergies_CRUD = require('./js/patient_allergies_CRUD.js')
app.use('/', patient_allergies_CRUD)
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});