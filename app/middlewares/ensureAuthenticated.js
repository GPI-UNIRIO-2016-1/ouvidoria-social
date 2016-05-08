function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', 'You must be logged in to do that.');
    res.redirect('/auth/login');
  }
}

module.exports = ensureAuthenticated