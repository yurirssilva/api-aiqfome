import { BeforeCreate, Column, CreatedAt, Default, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import * as bcrypt from "bcrypt";
import { FavoriteModel } from "./FavoriteModel";
import { v4 as uuid } from "uuid";

@Table({
    tableName: "users",
    timestamps: true,
})

export class UserModel extends Model {
    @PrimaryKey
    @Default(() => uuid())
    @Column
    id!: string;
  
    @Column
    name!: string;
  
    @Column
    email!: string;

    @Column
    role!: string
  
    @Column
    password!: string;
    @BeforeCreate
    static async encryptPass(instance: UserModel) {
      instance.password = await bcrypt.hash(instance.password, 8);
    }
  
    @CreatedAt
    @Column
    createdAt!: Date;
  
    @UpdatedAt
    @Column
    updatedAt!: Date;
  
    @HasMany(() => FavoriteModel, {
      onUpdate: "CASCADE",
    })
    favorites: FavoriteModel[];
}