const express = require("express");
const app = express();
const cors = require("cors");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 3000;
// enable cors for dev (client domain)
app.use(cors({ origin: `http://localhost:${port + 1}` }));

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/customers", require("./routes/customers"));
app.use("/api/customergroups", require("./routes/customerGroups"));
app.use("/api/catalog", require("./routes/catalog"));
app.use("/api/orders", require("./routes/orders"));

app.listen(port, () => console.log(`Listening on port ${port}...`));
