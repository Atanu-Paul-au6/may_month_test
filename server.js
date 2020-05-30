//importing all the base modules
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const coookieParser = require("cookie-parser");
var session = require("express-session");
const methodOverride = require("method-override");
const hbs = require("hbs");

//importing database connection
const connectDB = require(path.join(__dirname, "config/db_conn.js"));

//importing the route
const route = require(path.join(__dirname, "route/app_route.js"));

//initillizaing the express module
const app = express();

//setting up all the middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(coookieParser());
app.use(methodOverride("_method"));

//setting the public folder as static so that we can view the images
app.use(express.static(path.join(__dirname, "public")));

//setting up the hbs
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "view", "pages"));
app.set("view options", { layout: "main" });

//setting the partials
hbs.registerPartials(path.join(__dirname, "view", "partials"));

//declaring the port variable
const PORT = process.env.PORT || 8080;

//call to DB
connectDB();

// Adding the session capabilities
app.use(
  session({
    secret: "mymaytest",
    resave: false,
    name: "maytestSession",
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    },
  })
);

//mounting the route to a default path
app.use("/", route);

//setting up the server port for listening
app.listen(PORT, () => {
  console.log(
    `Express server Listing on Port: ${PORT} & running in :${process.env.NODE_ENV} `
  );
});
