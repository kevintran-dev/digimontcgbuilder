"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class Deck {

  /** Create a deck (from data), update db, return new deck data.
   *
   * data should be { deck, username, deckname }
   *
   * Returns { id, deck, username, deckname }
   **/

  static async create(data) {
    const result = await db.query(
      `INSERT INTO decks (deck,
                             username, deckname)
           VALUES ($1, $2, $3)
           RETURNING id, deck, username, deckname`,
      [
        data.deck,
        data.username,
        data.deckname
      ]);
    let deck = result.rows[0];

    return deck;
  }

  /** Find all decks 
   *
   * Returns [{ id, deck, username, deckname }, ...]
   * */

  static async findAll() {
    let query = `SELECT d.id,
                        d.deck,
                        d.username,
                        d.deckname
                 FROM decks d `;


    // Finalize query and return results

    query += " ORDER BY username";
    const decksRes = await db.query(query);
    return decksRes.rows;
  }

  /** Given a deck id, return data about deck.
   *
   * Returns { id, deck, username, deckname }
   *
   * Throws NotFoundError if not found.
   **/

  static async getById(id) {
    const res = await db.query(
      `SELECT id,
                  deck,
                  username,
                  deckname
           FROM decks
           WHERE id = $1`, [id]);

    const deck = res.rows[0];

    if (!deck) throw new NotFoundError(`No deck: ${id}`);

    return deck;
  }



  /** Update deck data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include: { deck, deckname }
   *
   * Returns { id, deck, username, deckname }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
      data,
      {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE decks 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                deck,
                                username,
                                deckname`;
    const result = await db.query(querySql, [...values, id]);
    const deck = result.rows[0];

    if (!deck) throw new NotFoundError(`No deck: ${id}`);

    return deck;
  }

  /** Delete given deck from database; returns undefined.
   *
   * Throws NotFoundError if deck not found.
   **/

  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM decks
           WHERE id = $1
           RETURNING id, username`, [id]);
    const deck = result.rows[0];

    if (!deck) throw new NotFoundError(`No deck: ${id}`);
  }
}

module.exports = Deck;
