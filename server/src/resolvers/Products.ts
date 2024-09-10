import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { NewProductInput, Product, ProductsArgs } from "../entity/Product.js";
import { User } from "../entity/User.js";

@Resolver(Product)
export class ProductResolver {
    @Query(returns => Product)
    async product(@Arg("id") id: number) {
        const product = await Product.findOneBy({ id });

        if (product === undefined) {
            throw new Error(`Product with id ${id} not found`);
        }

        return product;
    }

    @Query(returns => [Product])
    products(@Args() { skip, take }: ProductsArgs) {
        return Product.find({ skip, take });
    }

    @Mutation(returns => Product)
    //   @Authorized(Roles.Admin)
    async addProduct(
        @Arg("newProductData") newProductData: NewProductInput,
        @Ctx("user") user: User,
    ): Promise<Product> {
        const product = Product.create(newProductData);
        return await product.save();
    }

    @Mutation(returns => Boolean)
    //   @Authorized(Roles.Admin)
    async removeProduct(@Arg("id") id: number) {
        try {
            await Product.delete(id);
            return true;
        } catch {
            return false;
        }
    }
}