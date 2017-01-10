
module.exports = function(app, fs, Food, visionClient)
{
    app.get('/', function(req,res){
        res.render('index', {
            title: "Fridge!",
            length: 5
        });
    });

    app.get('/api/foods', function(req, res){
        Food.find(function(err, foods){
            if(err) return res.status(500).send({error: 'databse failure'});
            res.json(foods);
        });
    });

    app.get('/api/foods/:food_id', function(req, res){
        Food.findOne({_id: req.params.food_id}, function(err, food){
            if(err)
                return res.status(500).json({error: err});
            if(!food)
                return res.status(404).json({error: 'food not found'});
            res.json(food);
        });
    });

    app.get('/api/foods/label/:label', function(req, res){
        var query = Food.find({label: req.params.label}, {_id:1, label: 1, date: 1, position: 1});
        query.exec(function(err, foods){
            if(err)
                return res.status(500).json({error: err});

            if(foods.length === 0)
                return res.status(404).json({error: 'food not found'});
            res.json(foods);
        });
    });

    app.get('/api/foods/position/:position', function(req, res){
        var query = Food.find({position: req.params.position}, {_id:1, label: 1, logo: 1, date: 1, position: 1});
        query.exec(function(err, foods){
            if(err)
                return res.status(500).json({error: err});

            if(foods.length === 0)
                return res.status(404).json({error: 'food not found'});
            res.json(foods);
        });
    });

    app.post('/api/foods', function(req, res){
        var food = new Food();
        var file_name = './images/' + req.body.file_name;

        visionClient.detectLabels(file_name, function(err, labels){
            if (err) {
              return console.log(err);
            }
            food.label = labels;

            visionClient.detectLogos(file_name, function(err, logos){
                if(err)
                {
                    return cosole.log(err);
                }
                food.logo = logos;

                visionClient.detectText(file_name, function(err, text){
                    if(err)
                    {
                        return console.log(err);
                    }
                    //food.text = text;

                    food.position = req.body.position;
                    food.file_name = req.body.file_name;

                    food.save(function(err){
                        if(err){
                            console.error(err);
                            res.json({result: 0});
                            return;
                        }

                        //console.log(JSON.stringify(food, null, 2));
                        res.json({result: 1});
                    });
                });
            });
        });

    });

    app.put('/api/foods/:food_id', function(req, res){
        Food.findById(req.params.food_id, function(err, food){
            if(err) return res.status(500).json({error: 'database failure'});
            if(!food) return res.status(404).json({error: 'food not found'});

            if(req.body.label) food.label = req.body.label;
            if(req.body.logo) food.logo = req.body.logo;
            //if(req.body.text) food.text = req.body.text;
            if(req.body.position) food.position = req.body.position;

            food.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'food updated'});
            });
        });
    });

    app.put('/api/foods/position/:position', function(req, res){
        Food.findOne({position: req.params.position}, function(err, food){
            if(err) return res.status(500).json({error: 'database failure'});
            if(!food) return res.status(404).json({error: 'food not found'});

            if(req.body.position) food.position = req.body.position;

            food.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'food updated'});
            });
        });
    });

    app.delete('/api/foods/:food_id', function(req, res){
        Food.remove({_id: req.params.food_id}, function(err, output){
            if(err) return res.status(500).json({error: "database failure"});

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "food not found" });
            res.json({ message: "food deleted" });
            */

            res.status(204).end();
        });
    });

    app.delete('/api/foods/position/:position', function(req, res){
        Food.remove({position: req.params.position}, function(err, output){
            if(err) return res.status(500).json({error: "database failure"});

            res.status(204).end();
        });
    });
};
