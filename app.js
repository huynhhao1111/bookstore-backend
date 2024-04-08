const express = require("express");
const cors = require("cors");
const booksRouter = require("./app/routes/book.route");
const usersRouter = require("./app/routes/user.route");
const loansRouter = require("./app/routes/loan.route");



const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/books", booksRouter);
app.use("/api/users", usersRouter);
app.use("/api/loans", loansRouter);

app.get("/", (req, res) => {
    res.json({ message: "Chào Mừng Tới Ứng Dụng Quản Lý Mượn Sách"});
});



module.exports = app;