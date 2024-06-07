"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT username,
                  password
           FROM users
           WHERE username = $1`,
      [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register(
    { username, password }) {
    const duplicateCheck = await db.query(
      `SELECT username
         FROM users
         WHERE username = $1`,
      [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
         (username,
          password
          )
         VALUES ($1, $2)
         RETURNING username`,
      [
        username,
        hashedPassword
      ],
    );

    const user = result.rows[0];

    return user;
  }

  /** Find all users.
   *
   * Returns [{ username }, ...]
   **/

  static async findAll() {
    const result = await db.query(
      `SELECT username
           FROM users
           ORDER BY username`,
    );

    return result.rows;
  }

  /** Given a username, return data about user.
   *
   * Returns { username }
   *   where deck is { id, deck, username, deckname }
   *
   * Throws NotFoundError if user not found.
   **/

  static async getByUsername(username) {

    const userRes = await db.query(
      `SELECT decks.deck, decks.id, decks.username, decks.deckname FROM users INNER JOIN decks ON users.username=decks.username WHERE users.username = $1;`,
      [username],
    );
    const user = userRes.rows;

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }


  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
      `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
      [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }

}


module.exports = User;
