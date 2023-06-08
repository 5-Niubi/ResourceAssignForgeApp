import { storage } from "@forge/api";
import Resolver from "@forge/resolver";
import { CONTEXT } from "../common/constants";

function commonResolver(resolver: Resolver) {
  resolver.define("setContextToGlobal", (req) => {
    storage.set(CONTEXT, req.context);
    return req.context;
  });

  resolver.define("getText", async (req) => {
    storage.set("demoText", "demoText");
    return "Hello world!";
  });
}

export { commonResolver };
