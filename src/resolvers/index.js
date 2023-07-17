import  commonResolver  from "./commonResolver";
import projectResolver from "./projectResolver";
import skillResolver from "./skillResolver";
import taskResolver from "./taskResolver";
import workforceResolver from "./workforceResolver";
import milestoneResolver from "./milestoneResolver";
import parameterResolver from "./parameterResolver";
import scheduleResolver from "./scheduleResolver";

/**
 * @param {import("@forge/resolver").default} resolver
 */
function resolverReg(resolver){
    commonResolver(resolver);
    projectResolver(resolver);
    skillResolver(resolver);
    taskResolver(resolver);
    workforceResolver(resolver);
    milestoneResolver(resolver);
    parameterResolver(resolver);
    scheduleResolver(resolver);
}

export default resolverReg;