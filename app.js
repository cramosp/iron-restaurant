// First, we have to require Express so we can use it in our app.
const express = require("express");
const logger = require("morgan");

// Create an express server instance named `app`
// `app` is the Express server that will be handling requests and responses
const app = express();

// Setup the request logger to run on each request. This middleware doesn't need next, because it's already implicite in the package morgan:
app.use(logger("dev"));

// Make the static files inside of the `public/` folder publicly accessible
app.use(express.static("public"));

// JSON middleware to parse incoming HTTP requests that contain JSON
app.use(express.json());

//
// Custom middleware func, we need to invoke NEXT, so that the middleware function invokes the next one:
//

app.use((req, res, next) => {
  console.log("custom middleware one");
  next();
});

app.use((req, res, next) => {
  console.log("custom middleware two");
  next();
});

/* Install Routes: define the behaviour
-- Our previous variable, app, is an object. So I can use object methods like .get():
    app.get(path, fn) --> app.get("/", () => {})
    Request = req ; response = res ; next can be written if it's used or not.

-- Bad way to do it, cause you need to create a separate html file:

    app.get("/", (req, res, next) => {
    res.send(`
        <link rel="stylesheet" href="/stylesheets/style.css" />
        <h1>Welcome to our restaurant</h1>
        <h2>Best pizzas in town</h2>
        <img src='/images/home.jpg' />
    `);
    });
*/

// Good way. Create a separate html file and here:
app.get("/", (req, res, next) => {
  //res.send("<h1>Homepage</h1>")
  //res.json();
  res.sendFile(__dirname + "/views/homepage.html");
});

app.get("/about", (req, res, next) => {
  res.sendFile(__dirname + "/views/about.html");
});

app.get("/pizzas", (req, res, next) => {
  const pizzasArr = [
    {
      title: "Pizza Margarita",
      price: 12,
      imageFile: "pizza-margarita.jpg",
    },
    {
      title: "Veggie Pizza",
      price: 15,
      imageFile: "pizza-veggie.jpg",
    },
    {
      title: "Seafood Pizza",
      imageFile: "pizza-seafood.jpg",
    },
  ];

  res.json(pizzasArr);
});

// Start the server, listen the request:
app.listen(3000, () => console.log("My first app listening on port 3000! "));
