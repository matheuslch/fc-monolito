import Invoice from "../domain/invoice";

export interface InvoiceGateway {
    add(invoice: Invoice): Promise<Invoice>;
    find(id: string): Promise<Invoice>;    
}
