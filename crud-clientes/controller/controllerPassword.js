module.exports.getPassword = (req, res) => {
    res.render('password/password-main');
};

module.exports.getPasswordAlt = (req, res) => {
    res.render('password/password-alt');
};

module.exports.getPasswordAdd = (req, res) => {
    res.render('password/password-add');
};