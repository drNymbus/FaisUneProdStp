"use strict";

const express = require("express");
const path = require("path")
// const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000 ;

app.get("/", function (req, res) {
    console.log(req.query);
    res.sendFile(path.join(__dirname, "html/index.html"));
});

app.listen(PORT, function () {
    console.log('Listening on port :' + PORT);
});