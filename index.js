"use strict";
require("dotenv").config();
const app = require('./src/server');
const { db } = require('./src/models/index');
let port = process.env.PORT || 3030;
db.sync()
    .then(() => {

        app.start(port);
    }).catch((error) => {
        console.error("Error occurred during server startup:", error);
      });