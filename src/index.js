import Resolver from "@forge/resolver";
import { storage } from "@forge/api";
import { STORAGE } from "./common/constants";
import AuthenWithBE from "./services/authens/AuthenWithBE";
import resolverReg from "./resolvers";
const resolver = new Resolver();

/**
 * Register Resolver
 */
resolverReg(resolver);

export const handler = resolver.getDefinitions();
