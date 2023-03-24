const express = require("express");
const cors = require("cors");
const port = 4000;
const cleverbot = require("cleverbot-free");
require("dotenv").config();

const app = express();
const chathis = [];
var chathissimp = [];
var bot = false;
var read = true;

const image = true;

app.use(express.json());
app.use(cors());

var http = require('http').Server(app);
var io = require('socket.io')(http, {
    cors: {
    origin: [process.env.frontend, "http://localhost:8080"],
    }
});

app.get("/", (req, res) => {
    res.status(200).json({chathis});
});

const bottalk = async (talk) => {
    chathissimp.push(talk);
    let response = await cleverbot(talk, chathissimp);
    chathis.unshift({name: "goofy ahh bot", text: response});
    chathissimp.push(response);
    if (chathissimp > 30) {
        chathissimp = [];
    }
    io.emit('message');
    read = true;
}

app.post("/", async (req, res) => {
    if (!req.body.text || !req.body.name) {
        res.status(400).json({error: "missing field"});
        return 
    }
    chathis.unshift({name: req.body.name, text: req.body.text});

    if (bot && read) {
        try {
            read = false;
            bottalk(req.body.text);
        } catch {
            console.log("help");
        }
    }

    if (chathis.length > 20) {
        chathis.pop();
    }
    io.emit('message');
    res.status(200).json({chathis});
})

app.get("/bot", (req, res)=> {
    res.status(200).json({bot});
});

app.post("/bot", (req, res) => {
    if (req.body.bot === null) {
        res.status(400).json({error: "modified request"});
        return
    }
    bot = req.body.bot;
    res.status(200).json({bot});
});

io.on("connection", () => {
    console.log("a client is connected");
})

var server = http.listen(port, () => {
    console.log('server is running on port', server.address().port);
});

process.on("uncaughtException", (err)=> {
    console.log(err);
})
