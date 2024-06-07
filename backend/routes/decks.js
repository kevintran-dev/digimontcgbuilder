"use strict";

/** Routes for decks. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const Deck = require("../models/deck");
const { ensureCorrectUser, ensureCorrectDeckUser } = require("../middleware/auth");

const deckNewSchema = require("../schemas/deckNew.json");
const deckUpdateSchema = require("../schemas/deckUpdate.json");
const deckSearchSchema = require("../schemas/deckSearch.json");

const router = express.Router({ mergeParams: true });


/** POST / { deck } => { deck }
 *
 * deck should be { deck, deckname, username }
 *
 * Returns { id, deck, deckname, username }
 *
 * Authorization required: User
 */

router.post("/", ensureCorrectDeckUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, deckNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const deck = await Deck.create(req.body);
    return res.status(201).json({ deck });
  } catch (err) {
    return next(err);
  }
});

/** GET / =>
 *   { decks: [ { id, deck, username, deckname }, ...] }
 *

 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  const q = req.query;

  try {
    const validator = jsonschema.validate(q, deckSearchSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const decks = await Deck.findAll(q);
    return res.json({ decks });
  } catch (err) {
    return next(err);
  }
});

/** GET /[deckId] => { decl }
 *
 * Returns { id, deck, username, deckname }
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const deck = await Deck.getById(req.params.id);
    return res.json({ deck });
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[deckId]  { fld1, fld2, ... } => { deck }
 *
 * Data can include: { deck, deckname }
 *
 * Returns { id, deck, username, deckname }
 *
 * Authorization required: none
 */

router.patch("/:id", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, deckUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const deck = await Deck.update(req.params.id, req.body);
    return res.json({ deck });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  { deleted: id }
 *
 * Authorization required: user
 */

router.delete("/:id", ensureCorrectDeckUser, async function (req, res, next) {
  try {
    console.log("req.params.id", req.params.id)
    await Deck.remove(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    console.log("req.params.id", req.params.id)
    return next(err);
  }
});


module.exports = router;
