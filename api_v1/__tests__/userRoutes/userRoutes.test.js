const request = require("supertest");
const app = require("../../app.js");
const { post } = require("../../controllers/users.controllers.js");

describe("GET endpoints", () => {
    it("Should get one user", async () => {
        const res = await request(app)
            .get("/users/1");

        expect(res.statusCode).toEqual(200);
    });

    it("Should get all users", async () => {
        const res = await request(app)
            .get("/users/");

        expect(res.statusCode).toEqual(200);
    });
});

describe("POST endpoints", () => {
    it("Should create a user", async () => {
        const res = await request(app)
            post("/users/")
            .send(
                {
                    "username" : "testUN",
                    "firstName" : "testFN",
                    "email" : "test@test.com",
                    "password" : "test123",
                    "_token" : "testToken",
                }
            );

        expect(res.statusCode).toEqual(201);
        expect(res.body).toInclude("username");
    });
});

describe("PATCH endpoints", () => {
    it("Should update a user", async () => {
        const res = await request(app)
            .patch("/users/1")
            .send(
                {
                    "firstName" : "testFNUpdated",
                    "_token" : "testToken",
                }
            );

        expect(res.statusCode).toEqual(200);
        expect(res.body).toInclude("firstName");
    });
});

describe("DELETE endpoints", () => {
    it("should delete a user", async () => {
        const res = await request(app)
            .delete("/users/1")
            .send(
                {
                    "_token" : "testToken",
                }
            );

        expect(res.statusCode).toEqual(204);
        expect(res.body).toInclude("message");
    })
});
