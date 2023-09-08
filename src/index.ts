import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  let a = 3;
  if (a > 4) {
    res.send("OK");
  } else {
    res.send("Hello World!");
  }
});

app.get("/samurais", (req, res) => {
  res.send("Hello samsdsdei!");
});
app.post("/samurais", (req, res) => {
  res.send("We hav created samurais!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
