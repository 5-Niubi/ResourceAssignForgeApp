import { storage } from "@forge/api";
import AuthenWithBE from "../services/authens/AuthenWithBE";
import { STORAGE } from "../common/constants";

/**
 * @param {{ define: (arg0: string, arg1: { (req: any): Promise<any>; (req: any): Promise<any>; }) => void; }} resolver
 */
function commonResolver(resolver) {
	resolver.define("setContextToGlobal", async (req) => {
		await storage.set(STORAGE.CONTEXT, req.context);
		console.log(STORAGE.TOKEN, ": ", await storage.getSecret(STORAGE.TOKEN));
		return req.context;
	});

	resolver.define("getAuthenUrl", async function (req) {
		try {
			let authenUrl = await AuthenWithBE.generateOAuthURL(req.context);
			let isAuthenticated = await storage.get("isAuthenticated");
			return Promise.resolve({
				isAuthenticated,
				authenUrl,
			});
		} catch (error) {
			return Promise.reject(error);
		}
	});

	resolver.define("getIsAuthenticated", async function (req) {
		try {
			let isAuthenticated = await storage.get("isAuthenticated");
			return Promise.resolve({
				isAuthenticated,
			});
		} catch (error) {
			return Promise.reject(error);
		}
	});

	resolver.define("signout", async function (req) {
		try {
			await AuthenWithBE.handleUnauthorizedStatus();
			return Promise.resolve();
		} catch (error) {
			return Promise.reject(error);
		}
	});
}

export default commonResolver;
