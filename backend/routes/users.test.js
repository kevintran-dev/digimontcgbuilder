"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /users */

describe("GET /users", function () {

    test("lists all users", async function () {
        const resp = await request(app)
            .get("/users")
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            users: [
                { username: "u1" }
            ]
        })
    })

})

/************************************** GET /users/:username */

describe("GET /users/:username", function () {

    test("works for same user", async function () {
        const resp = await request(app)
            .get(`/users/u1`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            user: [{
                deck: '[{"cardnumber":"BT11-001","level":2,"type":"Digi-Egg","src":"https://images.digimoncard.io/images/cards/BT11-001.jpg","id":"dca81367-e025-4214-b04e-e86a0c0b6f9f"},{"cardnumber":"BT11-002","level":2,"type":"Digi-Egg","src":"https://images.digimoncard.io/images/cards/BT11-002.jpg","id":"009d02a5-acee-4379-aa94-f3a70f06fcf8"},{"cardnumber":"BT11-003","level":2,"type":"Digi-Egg","src":"https://images.digimoncard.io/images/cards/BT11-003.jpg","id":"cfeafe7f-2a3f-4036-9e18-620b4605b59f"},{"cardnumber":"BT11-004","level":2,"type":"Digi-Egg","src":"https://images.digimoncard.io/images/cards/BT11-004.jpg","id":"0329a814-bf56-4088-bc58-a56b65d5534c"},{"cardnumber":"BT11-005","level":2,"type":"Digi-Egg","src":"https://images.digimoncard.io/images/cards/BT11-005.jpg","id":"10defd34-d4a5-4250-8a78-0dfa2eca1a4a"}]',
                username: 'u1',
                deckname: 'testdeck',
                id: expect.any(Number)
            }],
        });
    });

    test("unauth for anon", async function () {
        const resp = await request(app)
            .get(`/users/u1`);
        expect(resp.statusCode).toEqual(500);
    });
})