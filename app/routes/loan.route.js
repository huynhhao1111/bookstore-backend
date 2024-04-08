const express = require("express");
const loans = require("../controllers/loan.controller");

const router = express.Router();

router.route("/")
    .get(loans.findAll)
    .post(loans.create)


router.route("/:id")
    .get(loans.findOne)
    .put(loans.update)
    .delete(loans.delete);

module.exports = router;