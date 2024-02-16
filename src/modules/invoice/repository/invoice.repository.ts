import Address from "../../@shared/domain/value-object/address"
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceItems from "../domain/InvoiceItems";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";

function parseInvoiceModelToInvoice(invoiceModel: InvoiceModel): Invoice {
    return new Invoice({
        id: new Id(invoiceModel.id),
        name: invoiceModel.name,
        document: invoiceModel.document,
        createdAt: invoiceModel.createdAt,
        updatedAt: invoiceModel.updatedAt,
        address: new Address(
            invoiceModel.addressStreet,
            invoiceModel.addressNumber,
            invoiceModel.addressComplement,
            invoiceModel.addressCity,
            invoiceModel.addressState,
            invoiceModel.addressZipCode,
        ),
        items: JSON.parse(invoiceModel.items).map((item: any) => {
            return new InvoiceItems({
                id: new Id(item._id._id),
                name: item._name,
                price: item._price,
            });
        }),
    });
}

export default class InvoiceRepository implements InvoiceGateway {
    
    async add(invoice: Invoice): Promise<Invoice> {

        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            items: invoice.items,
            addressStreet: invoice.address.street,
            addressNumber: invoice.address.number,
            addressComplement: invoice.address.complement,
            addressCity: invoice.address.city,
            addressState: invoice.address.state,
            addressZipCode: invoice.address.zipCode,
        });

        const invoiceModel = await InvoiceModel.findOne({
            raw: true,
            where: { id: invoice.id.id },
        });
        
        return parseInvoiceModelToInvoice(invoiceModel);
    }
    
    async find(id: string): Promise<Invoice> {
        const invoiceModel = await InvoiceModel.findOne({
            raw: true,
            where: { id: id },
        });
        
        return parseInvoiceModelToInvoice(invoiceModel);
    }
}
