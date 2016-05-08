/**
 * Created by urielbertoche on 12/24/2015.
 */

function attachAuthenticationStatus(req,res,next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;

  next();
}

module.exports = attachAuthenticationStatus;