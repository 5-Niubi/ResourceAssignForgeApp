import  commonResolver  from "./commonResolver";
import exportResolver from "./exportResolver";
import projectResolver from "./projectResolver";
import skillResolver from "./skillResolver";
import taskResolver from "./taskResolver";
import workforceResolver from "./workforceResolver";
import milestoneResolver from "./milestoneResolver";

/**
 * @param {import("@forge/resolver").default} resolver
 */
function resolverReg(resolver){
    commonResolver(resolver);
    projectResolver(resolver);
    skillResolver(resolver);
    taskResolver(resolver);
    workforceResolver(resolver);
    exportResolver(resolver);
    milestoneResolver(resolver);
}

export default resolverReg;