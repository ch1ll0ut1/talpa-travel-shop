import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Order } from "./Order.js";
import { Product } from "./Product.js";

@Entity()
@ObjectType()
export class OrderItem extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Order)
    @ManyToOne(() => Order, (parent) => parent.items, { nullable: true })
    order?: Relation<Order>;

    @Field()
    @Column({ nullable: true })
    orderId?: number;

    @Field(() => [OrderItem])
    @OneToMany(() => OrderItem, (item) => item.parentOrderItem, { cascade: true })
    bundleItems?: Relation<OrderItem[]>;

    @Field(() => OrderItem)
    @ManyToOne(() => OrderItem, (parent) => parent.bundleItems)
    parentOrderItem?: Relation<OrderItem>;

    @Field(() => Product)
    @ManyToOne(() => Product, { eager: true })
    @JoinColumn()
    product: Relation<Product>;

    @Field()
    @Column()
    productId: number;
}

@InputType()
export class NewOrderItemInput {
    @Field()
    productId: number;

    @Field(() => [NestedOrderItemInput])
    bundleItems?: NestedOrderItemInput[];
}

@InputType()
export class NestedOrderItemInput {
    @Field()
    productId: number;
}