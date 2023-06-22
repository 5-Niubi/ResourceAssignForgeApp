import  commonResolver  from "./commonResolver";
import projectResolver from "./projectResolver";
import skillResolver from "./skillResolver";

/**
 * @param {import("@forge/resolver").default} resolver
 */
function resolverReg(resolver){
    commonResolver(resolver);
    projectResolver(resolver);
    skillResolver(resolver);
}

export default resolverReg;