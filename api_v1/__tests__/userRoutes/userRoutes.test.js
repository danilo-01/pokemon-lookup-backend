const request = require("supertest");
const app = require("../../app.js");
const { post } = require("../../controllers/users.controllers.js");
const db = require("../../database/database.js");
const SqlToJs = require("../../helpers/sqlToJs.helpers.js");
const { User } = require("../../models/users.models.js");

let testUser;

beforeEach(async () => {
    const result = await db.query(`
        INSERT INTO users (username, first_name, email, hashed_password)
        VALUES ('test1', 'test', 'test@dummy.com', 'password123')
        RETURNING user_id, username, first_name, email`);
    testUser = result.rows[0];

    // CLEAN testUser
    SqlToJs.convert(testUser, "first_name", "firstName");
    SqlToJs.convert(testUser, "user_id", "userId");
})

afterEach(async () => {
    await db.query(`
        DELETE FROM users`);
})

afterAll(async () => {
    db.end();
})

describe("GET endpoints", () => {
    it("Should get one user", async () => {
        
        const res = await request(app)
            .get(`/users/${testUser.userId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([{
            "userId": testUser.userId,
            "username": testUser.username,
            "email": testUser.email,
            "firstName": testUser.firstName
        }]);
    });

    it("Should get all users", async () => {
        const res = await request(app)
            .get("/users/");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([{
            "userId": testUser.userId,
            "username": testUser.username,
            "email": testUser.email,
            "firstName": testUser.firstName
        }]);
    });
});

describe("POST endpoints", () => {
    it("Should create a user", async () => {
        const res = await request(app)
            .post("/users/")
            .send(
                {
                    "username" : "testUN",
                    "firstName" : "testFN",
                    "email" : "test@test.com",
                    "password" : "test123",
                    "_token" : "testToken"
                }
            );

        expect(res.statusCode).toEqual(201);
        expect(res.body).toMatchObject([{
            "username" : "testUN",
            "firstName" : "testFN",
            "email" : "test@test.com",
        }]);
    });
});

describe("PATCH endpoints", () => {
    it("Should update a user", async () => {
        const res = await request(app)
            .patch(`/users/${testUser.userId}`)
            .send(
                {
                    "firstName" : "testFNUpdated",
                    "_token" : "testToken",
                }
            );

        expect(res.statusCode).toEqual(200);
        
        expect(res.body)
        .toMatchObject([{
            "firstName": "testFNUpdated",
            "userId" : testUser.userId,
            "email": testUser.email,
            "username": testUser.username
        }]);
    });
});

describe("DELETE endpoints", () => {
    it("should delete a user", async () => {
        const res = await request(app)
            .delete(`/users/${testUser.userId}`)
            .send(
                {
                    "_token" : "testToken",
                }
            );

        expect(res.statusCode).toEqual(204);
    })
});
