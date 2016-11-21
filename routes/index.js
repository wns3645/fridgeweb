
module.exports = function(app, fs, Food)
{
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

    app.get('/api/foods/author/:author', function(req, res){
        Food.find({author: req.params.author}, {_id:0, title: 1, published_date: 1}, function(err, foods){
            if(err)
                return res.status(500).json({error: err});
            if(foods.length === 0)
                return res.status(404).json({error: 'food not found'});
            res.json(foods);
        });
    });

    app.post('/api/foods', function(req, res){
        var food = new Food();
        food.title = req.body.title;
        food.author = req.body.author;
        food.published_date = new Date(req.body.published_date);

        food.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});
        });
    });

    app.put('/api/foods/:food_id', function(req, res){
        Food.findById(req.params.food_id, function(err, food){
            if(err) return res.status(500).json({error: 'databs failure'});
            if(!food) return res.status(404).json({error: 'food not found'});

            if(req.body.title) food.title = req.body.title;
            if(req.body.author) food.author = req.body.author;
            if(req.body.published_date) food.published_date = req.body.pubhlished_date;

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
};
