"use strict";

/** Routes for users. */

const express = require("express");
const { ensureCorrectUser } = require("../middleware/auth");
const User = require("../models/user");

const router = express.Router();


/** GET / => { users: [ {username }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: none
 **/

router.get("/", async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});


/** GET /[username] => { user }
 *
 * Returns { username }
 * where deck is { id, deck, username, deckname }
 * Authorization required: same user-as-:username
 **/

router.get("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    const user = await User.getByUsername(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});




module.exports = router;
