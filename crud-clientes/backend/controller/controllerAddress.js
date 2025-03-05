module.exports.getAddress = (req, res) => {
    res.render('address/address-main')
};

module.exports.getAddressAlt = (req, res) => {
    res.render('address/address-alt');
};

module.exports.getAddressAdd = (req, res) => {
    res.render('address/address-add');
};