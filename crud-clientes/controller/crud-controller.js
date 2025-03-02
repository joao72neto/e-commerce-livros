module.exports = function(app){
    app.get('/', (req, res) => {
        res.end('Hello World!');
    });
}

