let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let methodOverride = require("method-override");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("main.ejs");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("app started");
});

app.get("/ip-subnet-calculator", (req, res) => {
    res.render("ip-subnet-calculator.ejs");
});

app.get("*", (req, res) => {
    res.redirect("/");
});