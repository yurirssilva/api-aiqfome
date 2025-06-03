import { BelongsTo, Column, CreatedAt, Default, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { v4 as uuid } from "uuid";
import { UserModel } from "./UserModel";

@Table({
    tableName: "favorites",
    timestamps: true,
})

export class FavoriteModel extends Model {
    @PrimaryKey
    @Default(() => uuid())
    @Column
    id!: string;

    @ForeignKey(() => UserModel)
    @Column
    user_id!: string;

    @Column
    product_id!: number;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

    @BelongsTo(() => UserModel)
    client: UserModel;
}