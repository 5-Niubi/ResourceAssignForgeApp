import Resolver from "@forge/resolver";
import { resolver } from "./resolvers";



const forgeResolver = new Resolver();

/**
 * Register Resolver
 */
resolver(forgeResolver);

export const handler = forgeResolver.getDefinitions();