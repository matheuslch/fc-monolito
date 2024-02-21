import express, { Request, Response } from "express";
import InvoiceFacadeFactory from "../../modules/invoice/factory/facade.factory";
import { FindInvoiceFacadeInputDto } from "../../modules/invoice/facade/invoice.facade.interface";

export const invoicesRoute = express.Router();

invoicesRoute.get("/:id", async (req: Request, res: Response) => {
    const facade = InvoiceFacadeFactory.create();
    try {
        const input: FindInvoiceFacadeInputDto = {
            id: req.params.id,
        };
        const invoice = await facade.findInvoice(input);
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).send(error);
    }
});
