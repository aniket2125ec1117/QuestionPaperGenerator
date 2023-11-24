const express = require("express");
const generateQuestion = require("./routes/generateQuestion");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
// app.use((req, res, next) => {
//     console.log("Hello world!");
//     next();
// })

app.use("/QuestionGenerator", generateQuestion);


app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: `Cannot find ${req.originalUrl} on this server!`,
  });
  const err = new Error(`Cannot find ${req.originalUrl} on this server`);
  err.statusCode = 404;
  err.status = "failed";

  next(err);
});

// Error handler
app.use((err, req, res, next) => {
    res.status(501).json({
        err: err.message
    })
    next();
});


app.listen(PORT, () => console.log("Connected to port", PORT));
