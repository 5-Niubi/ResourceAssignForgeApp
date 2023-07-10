import  commonResolver  from "./commonResolver";
import projectResolver from "./projectResolver";
import skillResolver from "./skillResolver";
import taskResolver from "./taskResolver";

/**
 * @param {import("@forge/resolver").default} resolver
 */
function resolverReg(resolver){
    commonResolver(resolver);
    projectResolver(resolver);
    skillResolver(resolver);
    taskResolver(resolver);
}

export default resolverReg;