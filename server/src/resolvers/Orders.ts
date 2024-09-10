import { Arg, Args, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { NewOrderInput, Order, OrdersArgs } from "../entity/Order.js";
import { OrderItem } from "../entity/OrderItem.js";
import { IsNull } from "typeorm";

@Resolver(Order)
export class OrderResolver {
    @Query(returns => Order)
    async order(@Arg("id") id: number) {
        const order = await Order.findOneBy({ id });

        if (order === undefined) {
            throw new Error(`Order with id ${id} not found`);
        }

        return order;
    }

    @Query(returns => [Order])
    orders(@Args() { skip, take }: OrdersArgs) {
        return Order.find({ skip, take });
    }

    @Mutation(returns => Order)
    async addOrder(
        @Arg("newOrderData") newOrderData: NewOrderInput,
    ): Promise<Order> {
        let order = Order.create(newOrderData as any); // NOTE: This is a workaround for a TypeScript bug
        return await order.save();
    }

    @FieldResolver()
    async items(@Root() order: Order) {
        return OrderItem.find({ where: { orderId: order.id, parentOrderItem: IsNull() } });
    }
}