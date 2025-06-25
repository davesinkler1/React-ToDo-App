const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const ToDoModel = require('./todo')
const countermodel = require('./counter')
//const GetTodo = require('./get_todo') 
const cors = require('cors');

const app = express();
const port = 3000;
const dbURI = 'mongodb+srv://jaudanafzal61:admin@cluster0.4xt6dca.mongodb.net/login_assignment?retryWrites=true&w=majority&appName=Cluster0'
const corsOptions ={
    origin:'http://localhost:3000/todolist', 
    credentials:true,            
    optionSuccessStatus:200
}

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));
/*const db = mongoose.connection;*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
//app.use(express.urlencoded({extended: true}))
//app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.send(`
        <form action="/addtodo" method="post">
            <label for="todo">Insert a new to-do:</label>
            <input type="text" id="todo" name="todo"><br><br>
            <button type="submit">Submit</button>
        </form>
    `);
});

app.get('/todolist', async(req, res) => {
    try {
        const todos = await ToDoModel.find();
        res.send({ status: "ok", data:todos });
        //res.writeHead(200, {'Content-Type':'application/json'});
        //const dataset = await GetTodo.todo(); 
        //res.write(dataset);
    } catch (error) {
        console.log(error);
    //} finally {
        //res.end();
    }
});

app.post('/addtodo', async (req, res) => {
    try {
        countermodel.findOneAndUpdate({"id":"autoval"}, {$inc:{"seq_value":1}}, {upsert:true, returnNewDocument: true});
        //const count = await countermodel.find();
        //res.send({ status: "ok", data:count });
    } catch(e) {
        console.log("error", e)
    }
    const todocreate = new ToDoModel({
        todo: req.body.todo
    });

    await todocreate.save();
    
    res.send('ToDo Added successfully');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});