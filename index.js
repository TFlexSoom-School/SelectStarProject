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
const cwd = process.cwd;
const app = require("express")();
const sassComp = require("express-compile-sass");
const handle = require("express-handlebars")

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

var PORT_NUM = 0;

if(process.env.PORT){
    PORT_NUM = process.env.PORT;
}else{
    PORT_NUM = 11777;
}

/* TODO Watch/Compile */

/* ADD GET Rules */
app.get('/', (req, res) => {
    console.log("== CONNECTION -> SENDING views/index");
    res.render("index");
});

/* LISTEN */
app.listen(PORT_NUM);
console.log("== LISTENING ON " + PORT_NUM);