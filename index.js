"use strict";

const express = require("express");
const path = require("path");
const {spawn} = require('child_process');
// const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000 ;

const tweet = () => {
    var data;

    // spawn new child process to call the python script
    const python = spawn('python', ['python-routine/main.py']);

    // collect data from script
    python.stdout.on('data', function (d) {
        console.log('Pipe data from python script ...');
        data = d.toString();
    });

    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        console.log(data);
    });

    return data;
}

// app.use(express.static(path.join(__dirname,'public')));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "html/index.html"));
});

app.listen(PORT, function () {
    console.log('Listening on port :' + PORT);
    tweet();
    setInterval(() => { tweet(); }, (1000 * 60 * 60 * 24)); // since it's in ms, 1000ms = 1s, then 60 seconds in 1 minute, 60 minutes in 1 hour, 24 hour for a day;
});
