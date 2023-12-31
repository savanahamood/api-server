'use strict';
const express = require("express");
const app = express();
const foodRouter = require('./routes/food.route');
const clothesRouter = require('./routes/clothes.route');
const bookRouter = require('./routes/book.route');
const authorRouter = require('./routes/author.route');

const notFoundHandler = require('./handlers/404');
const errorHandler = require('./handlers/500');


app.use(express.json());
app.use(foodRouter);
app.use(clothesRouter);
app.use(bookRouter);
app.use(authorRouter);


app.get('/', welcomeHandler);
function welcomeHandler(req, res) {
    
    res.status(200).send('hi');
}
app.use('*', notFoundHandler);
app.use(errorHandler)

function start(port) {
    app.listen(port, () => {
        console.log(`server is up and listen on ${port}`)
    });
}
module.exports = {
    start: start,
    app: app,
}