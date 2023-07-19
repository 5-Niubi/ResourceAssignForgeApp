import Resolver from "@forge/resolver";
import { threadService } from "../services";

/**
 * @param {Resolver} resolver
 */
function threadResolver(resolver) {
	resolver.define("getThreadStateInfo", async function (req) {
		try {
			return await threadService.getThreadState();
		} catch (error) {
			return Promise.reject(error);
		}
	});

	resolver.define("setThreadInfo", async function (req) {
		try {
			await threadService.addThreadState(req.payload.threadInfo);
			return Promise.resolve();
		} catch (error) {
			console.log("setThreadInfo");
			return Promise.reject(error);
		}
	});

	resolver.define("removeThreadInfo", async function (req) {
		try {
			await threadService.removeThreadState(req.payload.threadId);
			return Promise.resolve();
		} catch (error) {
			console.log("removeThreadInfo");
			return Promise.reject(error);
		}
	});

	resolver.define("getThreadResult", async function (req) {
		try {
			return await threadService.getThreadResult(req.payload.threadId);
		} catch (error) {
			return Promise.reject(error);
		}
	});
}

export default threadResolver;
