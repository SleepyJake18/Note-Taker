const express = require(`express`);

const noteRouter = require(`./notesRoutes`);

const app = express();


app.use(`/notesRoutes`, noteRouter);

module.exports = app;