require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { body } = require('express-validator');
const tokenMiddleware = require('./middleware/TokenMiddleware.js')
const {getAllTodos, getTodo, createTodo, patchTodo, deleteTodo} = require("./controllers/Todo");

mongoose.connect(process.env.CONNECT_MONGO).then((r) => {
    console.log('mongo connected')
}).catch((error) => {
    console.log('mongo error')
});

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(tokenMiddleware)

app.get('/todos', getAllTodos)

app.post(
    '/todos',
    body('message').isString().isLength({ min: 3, max: 255 }),
    createTodo
)

app.get('/todos/:id', getTodo)

app.patch(
    '/todos/:id',
    body('message').isString().isLength({ min: 3, max: 255 }),
    body('completed').isBoolean(),
    patchTodo
)

app.delete(
    '/todos/:id',
    deleteTodo
)

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})