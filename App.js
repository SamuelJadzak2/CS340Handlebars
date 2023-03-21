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
PORT        = 9866;                 // Set a port number at the top so it's easy to change in the future

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


app.get('/Appointments', function(req, res){
    // let query1 = "SELECT a.appointment_id, a.appointment_date_time, a.Patients_patient_id, a.Providers_provider_id, p.first_name, p.last_name FROM Appointments a JOIN Patients p ON a.Patients_patient_id = p.patient_id JOIN Providers pr ON a.Providers_provider_id = pr.provider_id";
    let query1 = "SELECT a.appointment_id, a.appointment_date_time, a.Patients_patient_id, a.Providers_provider_id, p.first_name AS patient_first_name, p.last_name AS patient_last_name, pr.first_name AS provider_first_name, pr.last_name AS provider_last_name FROM Appointments a JOIN Patients p ON a.Patients_patient_id = p.patient_id LEFT JOIN Providers pr ON a.Providers_provider_id = pr.provider_id";
    // let query1 = "Select * FROM Appointments"
    db.pool.query(query1, function(error, rows, fields){
      // Query the database to get the list of patients
      let query2 = "SELECT * FROM Patients";

      db.pool.query(query2, function(error, patients, fields) {
        // Query the database to get the list of providers
        let query3 = "SELECT * FROM Providers";

        db.pool.query(query3, function(error, providers, fields) {
          // Render the appointments page with the data
          res.render('appointments', {
            data:rows,
            patients:patients,
            providers:providers
          });
        });
      });
    });
  });


app.get('/Patients', function(req, res){
    let query1 = "SELECT * FROM Patients";

    db.pool.query(query1, function(error, rows, fields){
        res.render('patients', {data:rows});
    })
});

app.get('/Allergies', function(req, res) {
    console.log('get /Allergies');
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

app.get('/patient_allergies', function(req, res){
    let query1 = "SELECT pa.patient_allergies_id, pa.Patients_patient_id, pa.Allergies_allergies_id, a.allergy_name, p.first_name, p.last_name FROM Patient_Allergies pa JOIN Allergies a ON pa.Allergies_allergies_id=a.allergies_id JOIN Patients p ON pa.Patients_patient_id = p.patient_id";
    
    db.pool.query(query1, function(error, rows, fields){
      // Query the database to get the list of patients
      let query2 = "SELECT * FROM Patients";
      
      db.pool.query(query2, function(error, patients, fields) {
        // Query the database to get the list of allergies
        let query3 = "SELECT * FROM Allergies";
        
        db.pool.query(query3, function(error, allergies, fields) {
          // Render the patient allergies page with the data
          res.render('patient_allergies', {
            data:rows,
            patients:patients,
            allergies:allergies
          });
        });
      });
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
        let query2 = "SELECT * FROM Patients";
        db.pool.query(query2, function(error, patients, fields) {
            if (error) {
            console.log(error);
            }
            res.render('prescriptions', {
                data:rows,
                patients:patients});
        });
    });
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
const test_CRUD = require('./js/test_CRUD.js')
app.use('/', test_CRUD)

//PROVIDER PAGE
const provider_CRUD = require('./js/provider_CRUD.js')
app.use('/', provider_CRUD)

//PROCEDURE PAGE
const procedure_CRUD= require('./js/procedure_CRUD.js')
app.use('/', procedure_CRUD)

//ILLNESS PAGE
const illness_CRUD = require('./js/Illness_CRUD.js')
app.use('/', illness_CRUD)

const patient_allergies_CRUD = require('./js/patient_allergies_CRUD.js')
app.use('/', patient_allergies_CRUD)

const patient_CRUD = require('./js/patient_CRUD.js')
app.use('/', patient_CRUD)

const prescription_CRUD = require('./js/prescription_CRUD.js')
app.use('/', prescription_CRUD)

const appointment_CRUD = require('./js/appointment_CRUD.js')
app.use('/', appointment_CRUD)

const patient_test_CRUD = require('./js/patient_test_CRUD.js')
app.use('/', patient_test_CRUD)

const patient_illnesses_CRUD = require('./js/patient_illnesses_CRUD.js')
app.use('/', patient_illnesses_CRUD)

const patient_procedures_CRUD = require('./js/patient_procedures_CRUD.js')
app.use('/', patient_procedures_CRUD)

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});