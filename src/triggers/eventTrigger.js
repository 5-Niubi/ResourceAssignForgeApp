import AuthenWithBE from "../services/authens/AuthenWithBE";

async function provideOAuthUrlForUser() {
  let oauthURL = await AuthenWithBE.generateOAuthURL();
  //    invoke("provideOAuthURL");
//   await storage.set("broadcastOAuthURL", oauthURL);
}

export { provideOAuthUrlForUser };
