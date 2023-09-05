const express = require("express");
const routes = require("./routes/users.js");
const book_routes = require("./routes/book_list.js");
const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/user", routes);
app.use("/book", book_routes);

app.listen(PORT, () => console.log("Server is running at port " + PORT));
