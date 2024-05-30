function ensureAuthenticated(req, res, next) {
    if (req.session.agentId) {
        return next();
    }
    req.flash('error', 'You need to log in to access this page');
    res.redirect('/users/login');
}

function ensureAdmin(req, res, next) {
    if (req.session.agentId && req.session.role === 'admin') {
        return next();
    }
    req.flash('error', 'You need admin rights to access this page');
    res.redirect('/');
}

module.exports = {
    ensureAuthenticated,
    ensureAdmin
};