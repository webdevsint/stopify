const express = require("express");

const PORT = 3000 || process.env.PORT;

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(200);
});

app.use("/tracks", require("./routes/tracks"));
app.use("/albums", require("./routes/albums"));
app.use("/artists", require("./routes/artists"));

app.listen(PORT, () => {
  `server started on port:${PORT}`;
});
