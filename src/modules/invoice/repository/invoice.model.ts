import { Column, Model, PrimaryKey, Table, DataType } from "sequelize-typescript";

@Table({
    tableName: "invoices",
    timestamps: false,
})
export class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare document: string;

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;

    @Column({ allowNull: false, type: DataType.JSON })
    declare items: string;

    @Column({ allowNull: false })
    declare addressStreet: string;

    @Column({ allowNull: false })
    declare addressNumber: string;

    @Column({ allowNull: false })
    declare addressComplement: string;

    @Column({ allowNull: false })
    declare addressCity: string;

    @Column({ allowNull: false })
    declare addressState: string;

    @Column({ allowNull: false })
    declare addressZipCode: string;
}
