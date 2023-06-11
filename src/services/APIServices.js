import API, { storage } from "@forge/api";
import { BACKEND_dNET_DOMAIN, STORAGE } from "../common/constants";
import { HttpStatus } from "../common/httpStatus";
import AuthenWithBE from "./authens/AuthenWithBE";

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
      console.log("TOKEN: ", await storage.getSecret(STORAGE.TOKEN));
      let response = await API.fetch(`${this.DOMAIN}${url}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await storage.getSecret(STORAGE.TOKEN)}`,
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
      console.log(data);
      let response = await API.fetch(`${this.DOMAIN}${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await storage.getSecret(STORAGE.TOKEN)}`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return await response.json();
      } else if (response.status === HttpStatus.UNAUTHORIZED.code) {
        AuthenWithBE.handleUnauthorizedStatus();
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
  async put(url, data) {
    try {
      console.log(data);
      let response = await API.fetch(`${this.DOMAIN}${url}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await storage.getSecret(STORAGE.TOKEN)}`,
        },
        body: JSON.stringify(data),
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
   */
  async delete(url) {
    try {
      console.log("TOKEN: ", await storage.getSecret(STORAGE.TOKEN));
      let response = await API.fetch(`${this.DOMAIN}${url}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${await storage.getSecret(STORAGE.TOKEN)}`,
        }
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
