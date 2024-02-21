import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address"
import Invoice from "../domain/invoice";
import InvoiceItems from "../domain/InvoiceItems";
import InvoiceRepository from "./invoice.repository";
import { InvoiceModel } from "./invoice.model";

describe("InvoiceRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([InvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should add an invoice Repository", async () => {
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

        expect(result.id).toEqual(invoice.id);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.items[0].id.id).toEqual(invoice.items[0].id.id);
        expect(result.items[0].name).toEqual(invoice.items[0].name);
        expect(result.items[0].price).toEqual(invoice.items[0].price);
        expect(result.items[1].id.id).toEqual(invoice.items[1].id.id);
        expect(result.items[1].name).toEqual(invoice.items[1].name);
        expect(result.items[1].price).toEqual(invoice.items[1].price);
        expect(result.address).toEqual(invoice.address);
        expect(result.total).toEqual(invoice.total);
        expect(invoice.total).toEqual(23);
    });

    it("should find an invoice", async () => {
        const invoice = new Invoice({
            id: new Id("456"),
            name: "Invoice 02",
            document: "Document",
            items: [
                new InvoiceItems({
                    id: new Id("1"),
                    name: "Item 1",
                    price: 15,
                }),
                new InvoiceItems({
                    id: new Id("2"),
                    name: "Item 2",
                    price: 16,
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
        await invoiceRepository.add(invoice);
        const result = await invoiceRepository.find("456");

        expect(result.id).toEqual(invoice.id);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.items[0].id.id).toEqual(invoice.items[0].id.id);
        expect(result.items[0].name).toEqual(invoice.items[0].name);
        expect(result.items[0].price).toEqual(invoice.items[0].price);
        expect(result.items[1].id.id).toEqual(invoice.items[1].id.id);
        expect(result.items[1].name).toEqual(invoice.items[1].name);
        expect(result.items[1].price).toEqual(invoice.items[1].price);
        expect(result.address).toEqual(invoice.address);
        expect(result.total).toEqual(invoice.total);
        expect(invoice.total).toEqual(31);
    });
});
