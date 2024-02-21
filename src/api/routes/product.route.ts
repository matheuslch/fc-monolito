import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import { AddProductFacadeInputDto } from "../../modules/product-adm/facade/product-adm.facade.interface";

export const productsRoute = express.Router();

productsRoute.post("/", async (req: Request, res: Response) => {
    const facade = ProductAdmFacadeFactory.create();
    try {
        const productDto: AddProductFacadeInputDto = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            stock: req.body.stock,
            purchasePrice: req.body.purchasePrice,
        };
        await facade.addProduct(productDto);
        res.status(201).send();
    } catch (error) {
        res.status(500).send(error);
    }
});
