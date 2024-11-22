const express = require("express");
app = express();
PORT = 3000;

app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalURL}`);
});

app.use((req, res, next) => {
  next({ status: 404, message: `Endpoint not Found, Magellan` });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Somethin` `sploded");
});

app.listen(PORT, () => {
  console.log(
    `The App has heard the call of Port:${PORT} and The App will Answer!`
  );
});
