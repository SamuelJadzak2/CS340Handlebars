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

app.get('/Allergies', function(req, res){
    let query1 = "SELECT * FROM Allergies";

    db.pool.query(query1, function(error, rows, fields){
        res.render('allergies', {data:rows});
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

app.get('/Patient_Allergies', function(req, res){
    let query1 = "SELECT * FROM Patient_Allergies";

    db.pool.query(query1, function(error, rows, fields){
        res.render('patient_allergies', {data:rows});
    })
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
const add_allergy = require('./js/add_allergy.js')
app.use('/', add_allergy)
const delete_allergy = require('./js/delete_allergy.js')
app.use('/', delete_allergy)
//TEST PAGE
const add_test = require('./js/add_test.js')
app.use('/', add_test)
const delete_test= require('./js/delete_test.js')
app.use('/', delete_test)

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});