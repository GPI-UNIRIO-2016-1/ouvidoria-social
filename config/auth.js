/**
 * Created by urielbertoche on 12/24/2015.
 */

var configs = {
  facebookAuth: {
    clientID: "243199562708649", // Cadastrar app no facebook e pegar clientID
    clientSecret: "5230f564d5b94136137203ce60267328", // Cadastrar app no facebook e pegar clientSecret
    callbackURL: "http://os.bertoche.com.br/auth/facebook/callback"
  },

  facebookTestAuth: {
    clientID: "251299965231942",
    clientSecret: "692492db1250590aa6d87d35bc8cea10",
    callbackURL: "http://localhost:7000/auth/facebook/callback"
  }
};

module.exports = configs;
