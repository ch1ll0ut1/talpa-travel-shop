import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source.js";
import { ProductResolver } from "./resolvers/Products.js";

async function startApolloServer() {
    const schema = await buildSchema({
        resolvers: [ProductResolver],
      });

    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    });
    
    const { url } = await server.listen();
    console.log(`🚀 Server ready at ${url}`);
}

await AppDataSource.initialize();
await startApolloServer();
