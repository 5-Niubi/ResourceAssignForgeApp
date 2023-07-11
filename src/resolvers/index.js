import  commonResolver  from "./commonResolver";
import projectResolver from "./projectResolver";
import skillResolver from "./skillResolver";
import taskResolver from "./taskResolver";
import workforceResolver from "./workforceResolver";

/**
 * @param {import("@forge/resolver").default} resolver
 */
function resolverReg(resolver){
    commonResolver(resolver);
    projectResolver(resolver);
    skillResolver(resolver);
    taskResolver(resolver);
    workforceResolver(resolver);
}

export default resolverReg;