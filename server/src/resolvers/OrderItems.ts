import { Arg, Args, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { NewOrderInput, Order, OrdersArgs } from "../entity/Order.js";
import { NewOrderItemInput, OrderItem } from "../entity/OrderItem.js";
import { IsNull } from "typeorm";
import { Product } from "../entity/Product.js";

@Resolver(OrderItem)
export class OrderItemResolver {
    @Query(returns => OrderItem)
    async orderItem(@Arg("id") id: number) {
        const order = await OrderItem.findOneBy({ id });

        if (order === undefined) {
            throw new Error(`Order with id ${id} not found`);
        }

        return order;
    }

    @Query(returns => [OrderItem])
    orderItems(@Args() { skip, take }: OrdersArgs) {
        return OrderItem.find({ skip, take, where: { parentOrderItem: IsNull() } });
    }

    @FieldResolver()
    async bundleItems(@Root() order: OrderItem) {
        return OrderItem.find({ where: { parentOrderItem: order } });
    }
}