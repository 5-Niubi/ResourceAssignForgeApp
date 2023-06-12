import { storage } from "@forge/api";
import AuthenWithBE from "../services/authens/AuthenWithBE";
import { STORAGE } from "../common/constants";

/**
 * @param {{ define: (arg0: string, arg1: { (req: any): Promise<any>; (req: any): Promise<any>; }) => void; }} resolver
 */
function commonResolver(resolver) {
  resolver.define(
    "setContextToGlobal",
    async (/** @type {{ context: any; }} */ req) => {
      await storage.set(STORAGE.CONTEXT, req.context);
      return req.context;
    }
  );

  resolver.define("getAuthenUrl", async function (req) {
    let authenUrl = await AuthenWithBE.generateOAuthURL(req.context);
    let isAuthenticated = await storage.get("isAuthenticated");
    console.log(isAuthenticated);
    return Promise.resolve({
      isAuthenticated,
      authenUrl,
    });
  });
}

export default commonResolver;
