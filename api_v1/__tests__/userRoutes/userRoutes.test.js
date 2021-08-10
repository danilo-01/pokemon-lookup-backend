const request = require("supertest");
const app = require("../../app.js");

describe("GET endpoints", () => {
    it("Should get one user", async () => {
        const res = await request(app)
        .get("/users/1");

        expect(res.statusCode).toEqual(200);
        
    })
})