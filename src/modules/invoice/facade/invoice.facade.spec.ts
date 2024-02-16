import { Sequelize } from "sequelize-typescript";
import Address from "../../@shared/domain/value-object/address"
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceItems from "../domain/InvoiceItems";
import InvoiceRepository from "../repository/invoice.repository";
import InvoiceFacadeFactory from "../factory/facade.factory";
import { InvoiceModel } from "../repository/invoice.model";

describe("InvoiceFacade test", () => {
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

    it("should generate an invoice", async () => {
        const input = {
            name: "Invoice 01",
            document: "Document",
            street: "Rua 01",
            number: "123",
            complement: "Andar 01",
            city: "Caconde",
            state: "São Paulo",
            zipCode: "13770000",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 11,
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 12,
                },
            ],
        };

        const invoiceFacade = InvoiceFacadeFactory.create();
        const invoiceGenerated = await invoiceFacade.generateInvoice(input);
        const invoiceModel = await InvoiceModel.findOne({
            raw: true,
            where: { id: invoiceGenerated.id },
        });

        expect(invoiceGenerated.id).toBe(invoiceModel.id);
        expect(invoiceGenerated.name).toBe(input.name);
        expect(invoiceGenerated.document).toEqual(input.document);
        expect(invoiceGenerated.items).toEqual(input.items);
        expect(invoiceGenerated.total).toEqual(23);
        expect(invoiceGenerated.street).toEqual(input.street);
        expect(invoiceGenerated.number).toEqual(input.number);
        expect(invoiceGenerated.complement).toEqual(input.complement);
        expect(invoiceGenerated.city).toEqual(input.city);
        expect(invoiceGenerated.state).toEqual(input.state);
        expect(invoiceGenerated.zipCode).toEqual(input.zipCode);
    });

    it("should find an invoice", async () => {
        const input = {
            name: "Invoice 01",
            document: "Document",
            street: "Rua 01",
            number: "123",
            complement: "Andar 01",
            city: "Caconde",
            state: "São Paulo",
            zipCode: "13770000",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 11,
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 12,
                },
            ],
        };

        const invoiceFacade = InvoiceFacadeFactory.create();
        const invoiceGenerated = await invoiceFacade.generateInvoice(input);
        const invoiceFind = await invoiceFacade.findInvoice({ id: invoiceGenerated.id });

        expect(invoiceFind.id).toBe(invoiceGenerated.id);
        expect(invoiceFind.name).toBe(input.name);
        expect(invoiceFind.document).toEqual(input.document);
        expect(invoiceFind.items).toEqual(input.items);
        expect(invoiceFind.total).toEqual(23);
        expect(invoiceFind.address.street).toEqual(input.street);
        expect(invoiceFind.address.number).toEqual(input.number);
        expect(invoiceFind.address.complement).toEqual(input.complement);
        expect(invoiceFind.address.city).toEqual(input.city);
        expect(invoiceFind.address.state).toEqual(input.state);
        expect(invoiceFind.address.zipCode).toEqual(input.zipCode);
    });
});
