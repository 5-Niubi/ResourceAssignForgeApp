import Resolver from "@forge/resolver";
import { commonResolver } from "./resolvers/commonResolver";

function resolver(resolver : Resolver){
    commonResolver(resolver);
}

export {resolver};