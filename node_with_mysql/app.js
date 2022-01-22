const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 8000;

// TO RECIEVE THE DATA IN JSON FORMAT
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// CREATE CONNECTION WITH MYSQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Krishn@9518297071',
    database: 'node_with_mysql'
});

// CHECKING THE CONNECTION IF CONNECTED THE DATABASE THEN SHOW THE <<MySql Connected..>>
// OTHERWISE << err >> WILL BE SHOWN
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log(`MySql Connected..`);
});

// HERE WE ARE CREATING DATABASE USING << db.query(query,callbackFunction) >>
// QUERY : << CREATE DATABASE name_of_Database >>
app.get("/createdb",(req,res)=>{
    let sql = 'CREATE DATABASE node_mysql';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Database Created Successfully...')
    })
})

// CREATING A TABLE
// QUERY :  CREATE TABLE table_name(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255) PRIMARY KEY (id))
// HERE COLUMN_NAMES ARE -> id(data_type) , title(data_type) , body(data_type)
// AUTO_INCREMENT : IS A COLUMN WHICH WILL BE THE INDEX AUTO INCREMENT THE INDEX AS THE DATA WILL BE PUSHED INTO THE DATABASE
app.get("/createtable/:table",(req,res)=>{
    let table = req.params.table;
    let sql = `CREATE TABLE ${table}(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(`Table Created`);
    })
})

// DELETING A TABLE
app.get("/deletetable/:table",(req,res)=>{
    let table = req.params.table;
    let sql = `DROP TABLE IF EXISTS ${table}`
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(`Table Deleted Successfully`)
    })
});

// NOW WE ARE GOING TO INSERT DATA
// TO ADD DATA INTO THE DATABASE WE HAVE THE DATA IN FORM OF JAVASCRIPT OBJECT WHERE ITS KEYS ACTS AS ITS COLUMNS
// QUERY : INSERT INTO table_name SET ? (HERE ? MARK WILL IS ACTING AS THE PLACEHOLDER OF THE JAVASCRIPT OBJECT)
// db.query(query, javascript_object , callback_function)
// HERE DATA CAN ALSO COME FROM THE HTML FORM
app.get("/addpost/:title/:body",(req,res)=>{
    let title = req.params.title;
    let body = req.params.body;

    let post = {
        title:`${title}`,
        body: `${body}`
    };
    let sql = `INSERT INTO posts SET ?`;
    let query = db.query(sql, post, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(`New Post added Successfully`);
    })
});

// SELECT POSTS
// HERE WE ARE SELECTING ALL THE POSTS USING *
// QUERY : SELECT * FROM table_name (HERE * DENOTES THAT WE ARE SELECTING ALL THE POSTS FROM THAT PARTICULAR TABLE)
// db.query(query, callback_function)
app.get("/getposts",(req,res)=>{
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql,(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched ...');
    });
});

// NOW WE ARE SELECTING INDIVIDUAL POST OR WE CAN SAY THAT ROW
// QUERY : SELECT * FROM table_name WHERE id/index = id/index_number (according to which we are going to fetch the data)
app.get("/getpost/:id",(req,res)=>{
    let postId = req.params.id;
    let sql = `SELECT * FROM posts WHERE id = ${postId}`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(`Post fetched...`);
    });
});

// UPDATE POST DETAILS
// QUERY : UPDATE table_name SET << what_to_update >> WHERE << where_to_update >>
// title = 'new title' <-> id/index = id/index_number
app.get("/updatepost/:id",(req,res)=>{
    let newTitle = `Updated title of post 2`;
    let postId = req.params.id;
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${postId}`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(`Post Updated Sucessfully`);
    });
});

// DELETING THE POST / ROW
// QUERY : DELETE FROM posts WHERE id/index = id/index_number
app.get("/deletepost/:id",(req,res)=>{
    let postId = req.params.id;
    let sql = `DELETE FROM posts WHERE id = ${postId}`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(`Post Deleted Sucessfully`);
    });
});

app.listen(port,()=>{
    console.log(`Server is Listening at http://localhost:${port}`);
})


// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Krishn@9518297071';