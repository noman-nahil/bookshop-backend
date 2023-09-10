const express = require("express");
const routes = require("./routes/users.js");
const book_routes = require("./routes/book_list.js");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const app = express();
const PORT = 5000;

app.use(
  session({ secret: "fingerpint", resave: true, saveUninitialized: true })
);

let users = [
  {
    name: "John",
    email: "johnwick@gamil.com",
    password: "12345",
    DOB: "22-01-1990",
  },
  {
    name: "John",
    email: "johnsmith@gamil.com",
    password: "12345",
    DOB: "21-07-1983",
  },
  {
    name: "Joyal",
    email: "joyalwhite1@gamil.com",
    password: "12345",
    DOB: "21-03-1989",
  },
];
app.use(express.json());

app.use("/user", routes);
app.use("/book", book_routes);

app.post("/login", (req, res) => {
  const user = req.body.email;
  if (!user) {
    return res.status(404).json({ message: "Body Empty" });
  }
  let accessToken = jwt.sign(
    {
      data: user,
    },
    "access",
    { expiresIn: 60 * 60 }
  );

  req.session.authorization = {
    accessToken,
  };
  return res.status(200).send("User successfully logged in");
});
app.post("/signup", (req, res) => {
  if (req.body.password === "" && req.body.email === "") {
    return res.status(404).json({
      message:
        "you need to provide all information (Name,Email,Password & Date of Birth )",
    });
  }
  users.push({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    DOB: req.body.DOB,
  });
  //console.log(users);
  res.send("The user" + " " + req.body.name + " Has been added!");
});

app.listen(PORT, () => console.log("Server is running at port " + PORT));
