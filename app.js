const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
   
const app = express();
const jsonParser = express.json();
 
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
 
let dbClient;
 
app.use(express.static(__dirname + "/client"));
 
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client.db("list_products");
    app.locals.collection = client.db("list_products").collection("every_day");
   
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});

/*получение данных из коллекции по-умолчанию (every_day)*/
app.get("/api/list", function(req, res) {
    const collection = req.app.locals.collection;
    collection.find().toArray(function(err, list) {
       if(err) return console.log(err);
       res.send(list);                       
    });
});

/* изменение данных продукта */
app.put("/api/product", jsonParser, function(req, res) {
    if(!req.body) return res.sendStatus(400);
   
    const _id = new objectId(req.body._id);
    const item = req.body.item;
    const id = item.id;
    
    const collection = req.app.locals.collection;
    collection.findOneAndUpdate(
        {_id: _id},
        {$set: {"items.$[elem]": item}},
        {arrayFilters: [{"elem.id": {$eq: id}}]},
        function(err, result) {
            if(err) return console.log(err);
            res.send(item);
        });
});

/* добавление нового продукта в раздел */
app.put("/api/addProduct", jsonParser, function(req, res) {
    if(!req.body) return res.sendStatus(400);
    
    const _id = new objectId(req.body._id);
    const item = req.body.item;
    
    const collection = req.app.locals.collection;
    collection.findOneAndUpdate(
        {_id: _id},
        {$push: {items: item}},
        function(err, result) {
            if(err) return console.log(err);
            res.send(item);
        });
    
});

/*удаление продукта*/
app.put("/api/deleteProduct", jsonParser, function(req, res) {
    if(!req.body) return res.sendStatus(400);
    
    const _id = new objectId(req.body._id);
    const item = req.body.item;
    
    const collection = req.app.locals.collection;
    collection.findOneAndUpdate(
        {_id: _id},
        {$pull: {items: item}},
        function(err, result) {
            if(err) return console.log(err);
            res.send(item);
        });
});

/*изменение названия секции*/
app.put("/api/changeNameSection", jsonParser, function(req, res) {
    if(!req.body) return res.sendStatus(400);
    
    const _id = new objectId(req.body._id);    
    const section = req.body.section;
       
    const collection = req.app.locals.collection;
    collection.findOneAndUpdate(
        {_id: _id},
        {$set: {section: section}},
        function(err, result){
            if(err) return console.log(err);
            console.log(section);
            res.send(section);
        });     
});

/*добавление нового раздела*/
app.post("/api/addSection", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
       
    const id = req.body.id;    
    const section = req.body.section;
    const items = req.body.items;
    const newSection = {section: section, items: items};
    
    const collection = req.app.locals.collection;
    collection.insertOne(newSection, function(err, result){
        if(err) return console.log(err);
        res.send(newSection);
    });
});

/*удаление раздела*/
app.delete("/api/section/:_id", function(req, res) {
    const _id = new objectId(req.params._id);
    
    const collection = req.app.locals.collection;
    collection.deleteOne({_id: _id}, function(err, section){
        if(err) return console.log(err);
        res.send(section.value);
    });    
});

/*очистка таблицы с продуктами*/ 
app.get("/api/clearTable", function(req, res) {
    const collection = req.app.locals.collection;
    const name = {};
    const updateDoc = {$set: {"items.$[orderItem].isSelected": false, "items.$[orderItem].note": "", "items.$[orderItem].amount": 1}};
    const options = {
      arrayFilters: [{
        "orderItem.isSelected": true
      }]
    };
    
    collection.updateMany(name, updateDoc, options, 
        function(err, result) {
            if(err) return console.log(err);
            collection.find().toArray(function(err, result) {
                res.send(result);
            });
        });
});