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

app.use(express.static(cwd));

var PORT_NUM = 0;

if(process.env.PORT){
    PORT_NUM = process.env.PORT;
}else{
    PORT_NUM = 11777;
}

/* TODO Watch/Compile */

/* ADD GET Rules */
app.get('/', (req, res) => {
    console.log("== DIR -> SENDING DEFAULT ==");
    console.log("== CONNECTION -> SENDING index");
    res.render("index", data);
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

app.get('*', (req, res) => {
    console.log("== CONNECTION -> ERROR 404");
    console.log("== Big oof -> " + req.url);
    res.status(404).render("404");
});

/* LISTEN */
app.listen(PORT_NUM);
console.log("== LISTENING ON " + PORT_NUM);
