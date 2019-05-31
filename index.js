/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/3/2019
 *
 * Root Script for Running Site
 * Using:
 * render
 * handlebars
 * sass
 *
 */

/* INCLUDES */
const cwd = process.cwd();
const express = require("express");
const app = express();
const sassComp = require("express-compile-sass");
const handle = require("express-handlebars");

/* Note this will not error out immediately if MySql does not connect */
const db = require("./server_src/mysql.js")();

/* Data for initial templates*/
var data = require("./content.json");
//console.log(JSON.stringify(data));

/* Middleware setup */
app.engine('handlebars', handle({defaultLayout: 'main'}));
app.set("view engine", "handlebars");

app.use(
    sassComp({
        root: cwd, /* A ref to present working directory */
        sourceComments: false, /* Strip comments in .scss files */
        watchFiles: true, /* Watch files ... don't save them I guess? */
        logToConsole: false /* Don't log anything to Console */
    })
)

app.use(express.json());

/* Correction - This is for security - Only for sass files */
app.use(express.static(cwd + "/style"));
app.use(express.static(cwd + "/src"));

var PORT_NUM = 0;

if(process.env.PORT){
    PORT_NUM = process.env.PORT;
}else{
    PORT_NUM = 11777;
}

/* ADD GET Rules */
app.get('/', (req, res) => {
    console.log("== DIR -> SENDING DEFAULT ==");
    console.log("== CONNECTION -> SENDING index");
    res.render("index", data);
});

/* Private handlebars file for AJAX queries :P */
app.get('results.html', (req, res) => {
    console.log("== CONNECTION -> Attempted a bad file... that's a no");
    console.log("== Prevented! -> " + req.url);
    res.status(404).render("404");
});

app.get('*.html', (req, res) => {
    console.log("== CONNECTION -> REQUESTING " + req.url);
    var send = req.url.substring(1, req.url.lastIndexOf(".html"));
    console.log("== SENDING " + send);
    res.render(send, data);
});


app.get('*.scss', (req, res) => {
    console.log("== CONNECTION -> Stylesheet");
    console.log("== Requested -> " + req.url);
    res.render(req.url);    
});


app.get('*.svg', (req, res) => {
    console.log("== CONNECTION -> Icon");
    console.log("== Requested -> " + req.url);
    console.log("== Sending -> ./icons" + req.url);
    console.log("== " + cwd);
    res.sendFile(cwd + "/icons" + req.url);  
});

app.get('*.png', (req, res) => {
    console.log("== CONNECTION -> Image");
    console.log("== Requested -> " + req.url);
    res.sendFile(cwd + "/imgs" + req.url);  
});

app.get('*.js', (req, res) => {
    console.log("== CONNECTION -> Script");
    console.log("== Requested -> " + req.url);
    res.sendFile(cwd + "/src" + req.url);
});

/* AJAX Scripts */

app.use("/read", require("./server_src/read.js")(db));
app.use("/create",require("./server_src/create.js")(db));
app.use("/update", require("./server_src/update.js")(db));
app.use("/delete",require("./server_src/delete.js")(db));

/* Error Handling for other cases */

app.use((req, res) => {
    console.log("== CONNECTION -> ERROR 404");
    console.log("== Big oof -> " + req.url);
    res.status(404).render("404");
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).render("500");
});

/* LISTEN */
app.listen(PORT_NUM);
console.log("== LISTENING ON " + PORT_NUM);
