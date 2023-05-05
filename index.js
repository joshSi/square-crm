const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/customers", require("./routes/customers"));
app.use("/api/customergroups", require("./routes/customerGroups"));
app.use("/api/catalog", require("./routes/catalog"));

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
