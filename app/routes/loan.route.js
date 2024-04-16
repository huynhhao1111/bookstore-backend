const express = require("express");
const loans = require("../controllers/loan.controller");

const router = express.Router();

router.route("/")
    .get(loans.findAll)
    .post(loans.create)
    .delete(loans.deleteAll)



router.route("/:id")
    .get(loans.findOne)
    .put(loans.update)
    .delete(loans.delete);

module.exports = router;