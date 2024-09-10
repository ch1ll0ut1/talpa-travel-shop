import { Length, Max, MaxLength, Min } from "class-validator";
import { ArgsType, Field, InputType, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { NewOrderItemInput, OrderItem } from "./OrderItem.js";

@Entity()
@ObjectType()
export class Order extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => [OrderItem])
    @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
    items: Relation<OrderItem[]>;

    @Field()
    @Column()
    firstName: string

    @Field()
    @Column()
    lastName: string

    @Field()
    @CreateDateColumn()
    date: Date;
}


@InputType()
export class NewOrderInput {
    @Field()
    @MaxLength(30)
    firstName: string;
    
    @Field()
    @MaxLength(30)
    lastName: string;

    @Field(() => [NewOrderItemInput])
    items: NewOrderItemInput[];
}

@ArgsType()
export class OrdersArgs {
    @Field(type => Int)
    @Min(0)
    skip: number = 0;

    @Field(type => Int)
    @Min(1)
    @Max(50)
    take: number = 50;
}