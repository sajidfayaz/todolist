const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require ("lodash");

const app = express();



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Go grocery Shopping"
});

const item2 = new Item ({
    name: "Do the laundry"
});

const item3 = new Item ({
    name: "Get your hair done"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", (req, res) => {

    Item.find({}, (err, items) => {
        if(items.length === 0) {
            Item.insertMany(defaultItems, (err) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Successfully added data to the Database");
                }
            });
            res.redirect("/");
        } else {
            res.render("list", {title: "Today", listItems: items});
        }
    });    
});

app.get("/:newList", (req, res) => {
    const newList = _.capitalize(req.params.newList);
    List.findOne({name: newList}, (err, results) => {
        if(!err) {
            if(!results) {
                // create new list
                const list = new List ({
                    name: newList,
                    items: defaultItems
                });
                list.save();
                res.redirect("/" + newList);
            } else {
                // render already existing list
                res.render("list", {title: results.name, listItems: results.items});
            }
        } else {
            console.log(err);
        }
    });
});




app.post("/", (req, res) => {
    const itemName = req.body.newItem;
    const listName = req.body.button;

    const item = new Item({
        name: itemName
    });

    if(listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({name: listName}, (err, foundList) => {
            if(!err) {
                foundList.items.push(item);
                foundList.save();
                res.redirect("/" + listName);
            }
            
        });
    }
        
    
});

app.post("/delete", (req, res) => {
    const deleteItem = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === "Today") {
        console.log("yess this is working");
        Item.findByIdAndRemove(deleteItem, (err) => {
            if(!err) {
                res.redirect("/");
            }
        });
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: deleteItem}}}, (err, foundList) => {
            if(!err) {
                res.redirect("/" + listName);
            }
        });

        
    }
    
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});