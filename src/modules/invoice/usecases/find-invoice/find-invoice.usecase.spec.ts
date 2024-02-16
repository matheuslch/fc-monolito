import Address from "../../../@shared/domain/value-object/address"
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItems from "../../domain/InvoiceItems";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
    id: new Id("123"),
    name: "Invoice 01",
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
        "Casa Verde",
        "Criciúma",
        "SC",
        "88888-888"
    )
});

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        add: jest.fn(),
    };
};

describe("FindInvoiceUseCase unit test", () => {
    it("should find an invoice UseCase", async () => {
        const repository = MockRepository();
        const findInvoiceUseCase = new FindInvoiceUseCase(repository);

        const result = await findInvoiceUseCase.execute({ id: "123" });

        expect(result.id).toEqual(invoice.id.id);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.address).toEqual(invoice.address);
        expect(result.items).toEqual([
            { id: invoice.items[0].id.id, name: invoice.items[0].name, price: invoice.items[0].price },
            { id: invoice.items[1].id.id, name: invoice.items[1].name, price: invoice.items[1].price },
        ]);
        expect(result.total).toEqual(31);
    });
});
