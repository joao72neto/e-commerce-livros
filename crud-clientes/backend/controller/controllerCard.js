module.exports.getCard = (req, res) => {
    res.render('card/card-main');
};

module.exports.getCardAdd = (req, res) => {
    res.render('card/card-add');
};

module.exports.getCardAlt = (req, res) => {
    res.render('card/card-alt');
};