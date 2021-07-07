const express = require("express");
const port = 3000;

let app = express();

app.use(express.static(__dirname + "/client/dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/client/dist/index.html', function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});