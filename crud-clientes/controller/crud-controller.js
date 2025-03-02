module.exports = function(app){

    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/signup', (req, res) => {
        res.render('signup');
    });

    app.get('/password', (req, res) => {
        res.render('password');
    })

    app.get('/transacoes', (req, res) => {
        res.render('transacoes');
    })

    app.get('/inativos', (req, res) => {
        res.render('inativos');
    });

    app.get('/address', (req, res) => {
        res.render('./address/address-main');
    })

    app.get('/address/alt', (req, res) => {
        res.render('./address/address-alt');
    });

    app.get('/address/add', (req, res) => {
        res.render('./address/address-add');
    });

    app.get('/card', (req, res) => {
        res.render('./card/card-main');
    });

    app.get('/card/alt', (req, res) => {
        res.render('./card/card-alt');
    });

    app.get('/card/add', (req, res) => {
        res.render('./card/card-add');
    });
;}

