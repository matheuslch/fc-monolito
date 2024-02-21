import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                id: "1",
                name: "Product 1",
                description: "Product Description",
                stock: 5,
                purchasePrice: 20,
            });
        expect(response.status).toEqual(201);
    });
});
