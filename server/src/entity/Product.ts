import { MaxLength, Length, Min, Max } from "class-validator";
import { ArgsType, Field, ID, InputType, Int, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
@ObjectType()
export class Product extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

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
    @MaxLength(30)
    title: string;

    @Field()
    @Length(30, 255)
    description: string;
    
    @Field()
    price: number;
    
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