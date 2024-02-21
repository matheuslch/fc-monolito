import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for client", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                id: "1",
                name: "Matheus",
                email: "matheus@email.com",
                document: "123456",
                address: {
                    street: "Rua 123",
                    number: "99",
                    complement: "Complemento",
                    city: "Caconde",
                    state: "SP",
                    zipCode: "88888-888",
                },
            });
        expect(response.status).toEqual(201);
    });
});
