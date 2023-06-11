import  commonResolver  from "./commonResolver";
import projectResolver from "./projectResolver";

/**
 * @param {import("@forge/resolver").default} resolver
 */
function resolver(resolver){
    commonResolver(resolver);
    projectResolver(resolver);
}

export default resolver;