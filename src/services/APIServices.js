import API, { storage } from "@forge/api";
import { BACKEND_dNET_DOMAIN, TOKEN } from "../common/constants";

/**
 * Using for get api from .NET server
 */
class APIServices {
  DOMAIN = BACKEND_dNET_DOMAIN;

  /**
   * @param {string} url
   */
  async get(url) {
    try {    
      console.log("TOKEN: ", await storage.getSecret(TOKEN));
      let response = await API.fetch(`${this.DOMAIN}${url}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await storage.getSecret(TOKEN)}`,
        },
      });
      if (response.ok) {
        return await response.json();
      }
      return Promise.reject(response);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * @param {string} url
   * @param {Object} data
   */
  async post(url, data) {
    try {
      let response = await API.fetch(`${this.DOMAIN}${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await storage.getSecret(TOKEN)}`,
        },
        body: data,
      });
      if (response.ok) {
        return await response.json();
      }
      return Promise.reject(response);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default new APIServices();
