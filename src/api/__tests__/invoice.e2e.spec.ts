import { app, sequelize } from "../express";
import request from "supertest";

import Id from "../../modules/@shared/domain/value-object/id.value-object";
import Address from "../../modules/@shared/domain/value-object/address"
import InvoiceItems from "../../modules/invoice/domain/InvoiceItems";
import Invoice from "../../modules/invoice/domain/invoice";
import InvoiceRepository from "../../modules/invoice/repository/invoice.repository";

describe("E2E test for invoice", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should get invoice", async () => {
        const invoice = new Invoice({
            id: new Id("123"),
            name: "Invoice 1",
            document: "Document",
            items: [
                new InvoiceItems({
                    id: new Id("1"),
                    name: "Item 1",
                    price: 11,
                }),
                new InvoiceItems({
                    id: new Id("2"),
                    name: "Item 2",
                    price: 12,
                })
            ],
            address: new Address(
                "Rua 123",
                "99",
                "Complemento",
                "Caconde",
                "SP",
                "88888-888"
            )
        });

        const invoiceRepository = new InvoiceRepository();
        const result = await invoiceRepository.add(invoice);
        
        const respInvoice = await request(app).get(`/invoice/${123}`);

        expect(respInvoice.status).toEqual(200);
        expect(result.id.id).toEqual(respInvoice.body.id);
        expect(result.name).toEqual(respInvoice.body.name);
        expect(result.document).toEqual(respInvoice.body.document);
        expect(result.items[0].id.id).toEqual(respInvoice.body.items[0].id);
        expect(result.items[0].name).toEqual(respInvoice.body.items[0].name);
        expect(result.items[0].price).toEqual(respInvoice.body.items[0].price);
        expect(result.items[1].id.id).toEqual(respInvoice.body.items[1].id);
        expect(result.items[1].name).toEqual(respInvoice.body.items[1].name);
        expect(result.items[1].price).toEqual(respInvoice.body.items[1].price);
        expect(result.address).toEqual(respInvoice.body.address);
        expect(result.total).toEqual(respInvoice.body.total);
        expect(invoice.total).toEqual(23);
    });
});
