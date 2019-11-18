var express = require("express");
var router = require("./controllers/burger_controller.js");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3300;

var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(router);

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});