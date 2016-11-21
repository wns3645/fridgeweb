//router!
// What is rouetr?
// The router means that some definition about when request came from client, what application shuld be executed.
// It is better that Router and Server are seperated in different source code.
// when "GET" request is received from client, do callback.--> .end("hello world")

module.exports = function(app, fs)
{
    app.get('/', function(req,res){
        res.render('index', {
            title: "ejs test",
            length: 5
        });
    });
};
