exports.authorize = function (req, res, next) {
    if (!req.session.userName) {
        res.redirect('/login');
    } else {
        next();
    }
};