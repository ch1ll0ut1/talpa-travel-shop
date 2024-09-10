import { Max, Min } from "class-validator";
import { ArgsType, Field, InputType, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { OrderItem } from "./OrderItem.js";

@Entity()
@ObjectType()
export class Product extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ default: false, select: false })
    softDelete: boolean;

    @Field()
    @Column()
    price: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    // TODO: use another table for locations
    @Field()
    @Column()
    location: string;

    @Field()
    @Column()
    image: string;

    // TODO: make it a strict enum
    @Field()
    @Column()
    category: string;

    @Field()
    @Column()
    date: string;
}


@InputType()
export class NewProductInput {
    @Field()
    price: number;

    @Field()
    name: string;

    @Field()
    description: string;
    
    @Field()
    location: string;
    
    @Field()
    image: string;
    
    @Field()
    category: string;
    
    @Field()
    date: string;
}

@ArgsType()
export class ProductsArgs {
    @Field(type => Int)
    @Min(0)
    skip: number = 0;

    @Field(type => Int)
    @Min(1)
    @Max(50)
    take: number = 50;
}