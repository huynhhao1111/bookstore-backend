const express = require("express");
const users = require("../controllers/user.controller");

const router = express.Router();

router.route("/")
    .get(users.findAll)
    .post(users.create)
    .post(users.deleteAll)

router.route("/:id")
    .get(users.findOne)
    .put(users.update)
    .delete(users.delete);

module.exports = router;