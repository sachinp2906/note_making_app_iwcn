const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const cors = require('cors')

const app = express()
app.use(cors())
const PORT = 3000;

// database connection code
connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sachin@ms1',
    database : 'note_making_app'
});

connection.connect((err)=>{
    if(err) {
        throw err;
    }
    else{
        console.log("succesfully connected with db")
    }
})

app.set('view engine' , 'ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.json())


// fetching the notes data
app.get('/fetch' , (req , res) => {
    connection.query('SELECT * FROM notes_data' ,  (err , result) => {
        if(err) {
            return res.status(400).send({status : false , message : "data fetching failed"})
        }
        return res.status(200).send({notes : result})
    })
});



// creating the notes data
app.post('/create' , (req , res)=>{
    let {title , body} = req.body;
    connection.query('INSERT INTO notes_data (title , body) VALUES (? , ?)' , [title , body] , (err , result)=> {
        if(err) {
            return res.status(400).send({status : false , message : "data not created"})
        }else{
            console.log("sent")
            return res.redirect('/fetch')
        }
    })
})

// deleting the notes data
app.get('/delete/:id' , (req , res)=> {
    let {id} = req.params;
    connection.query('DELETE FROM notes_data WHERE id=?' , [id] , (err , result) => {
     if(err) {
        return res.status(400).send({status : false , message : "unable to delete note"})
     }
     else{
        return res.redirect('/fetch');
     }
    })
})


app.listen(PORT , ()=> {
    console.log(`express app running on port ${PORT}`)
})