import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Address from "../../../@shared/domain/value-object/address"
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItems from "../../domain/InvoiceItems";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import {
    GenerateInvoiceUseCaseInputDto,
    GenerateInvoiceUseCaseOutputDto,
} from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
    constructor(private invoiceRepository: InvoiceGateway) { }

    async execute(
        input: GenerateInvoiceUseCaseInputDto
    ): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address: new Address(
                input.street,
                input.number,
                input.complement,
                input.city,
                input.state,
                input.zipCode,
            ),
            items: input.items.map((item) =>
                new InvoiceItems({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price,
                })
            ),
        });

        await this.invoiceRepository.add(invoice);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((Item) => ({
                id: Item.id.id,
                name: Item.name,
                price: Item.price,
            })),
            total: invoice.total,
        };
    }
}
