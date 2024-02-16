import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "./client.model"
import ClientRepository from "./client.repository"
import Client from "../domain/client.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import Address from "../../@shared/domain/value-object/address"

describe("Client Repository test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([ClientModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a client", async () => {

        const client = new Client({
            id: new Id("1"),
            name: "Lucian",
            email: "lucian@teste.com",
            document: "1234-5678",
            address: new Address(
                "Rua 123",
                "99",
                "Casa Verde",
                "Criciúma",
                "SC",
                "88888-888"
            )
        })

        const repository = new ClientRepository()
        await repository.add(client)

        const clientDb = await ClientModel.findOne({raw: true, where: { id: "1" } })

        expect(clientDb).toBeDefined()
        expect(clientDb.id).toEqual(client.id.id)
        expect(clientDb.name).toEqual(client.name)
        expect(clientDb.email).toEqual(client.email)
        expect(clientDb.document).toEqual(client.document)
        expect(clientDb.street).toEqual(client.address.street)
        expect(clientDb.number).toEqual(client.address.number)
        expect(clientDb.complement).toEqual(client.address.complement)
        expect(clientDb.city).toEqual(client.address.city)
        expect(clientDb.state).toEqual(client.address.state)
        expect(clientDb.zipcode).toEqual(client.address.zipCode)
        expect(new Date(clientDb.createdAt)).toStrictEqual(client.createdAt)
        expect(new Date(clientDb.updatedAt)).toStrictEqual(client.updatedAt)
    })

    it("should find a client", async () => {

        const client = new Client({
            id: new Id("1"),
            name: "Lucian",
            email: "lucian@teste.com",
            document: "1234-5678",
            address: new Address(
                "Rua 123",
                "99",
                "Casa Verde",
                "Criciúma",
                "SC",
                "88888-888"
            )
        })

        const repository = new ClientRepository()
        await repository.add(client)

        const result = await repository.find(client.id.id)

        expect(result.id.id).toEqual(client.id.id)
        expect(result.name).toEqual(client.name)
        expect(result.email).toEqual(client.email)
        expect(result.address.street).toEqual(client.address.street)
        expect(result.address.number).toEqual(client.address.number)
        expect(result.address.complement).toEqual(client.address.complement)
        expect(result.address.city).toEqual(client.address.city)
        expect(result.address.state).toEqual(client.address.state)
        expect(result.address.zipCode).toEqual(client.address.zipCode)
        expect(result.createdAt).toStrictEqual(client.createdAt)
        expect(result.updatedAt).toStrictEqual(client.updatedAt)
    })
})