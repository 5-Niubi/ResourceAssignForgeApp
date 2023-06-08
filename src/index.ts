import API, { route } from "@forge/api";
import Resolver from "@forge/resolver";
import * as MyResolver from "./resolver";
const forgeResolver = new Resolver();
const BE_DEV = "https://c3dc-1-55-142-174.ngrok-free.app";


/**
 * Register Resolver
 */
MyResolver.resolver(forgeResolver);

export const handler = forgeResolver.getDefinitions();