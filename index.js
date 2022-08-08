"use strict";

const express = require("express");
const path = require("path");
const {spawn} = require('child_process');
// const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000 ;

// const compare_time = (t1, t2) => {
//     return (t1.getHours() == t2.getHours()) && (t1.getMinutes() == t2.getMinutes()) && (t1.getSeconds() == t2.getSeconds());
// }

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
    // var tweeted = false;
    // var exec_time = new Date();
    // exec_time.setHours(0,0,0);

    // while (true) {
    //     var local_time = new Date();

    //     if (!tweeted && compare_time(local_time, exec_time)) {
    //         console.log("tweeting ...");

    //         var data = tweet();
    //         tweeted = true;

    //         console.log("tweeted.");
    //     }

    //     if (!compare_time(local_time, exec_time)) { tweeted = false; }
    // }
});
