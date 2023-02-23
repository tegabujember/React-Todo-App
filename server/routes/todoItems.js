const router = require("express").Router();
//import todo model
const todoItemsModel = require("../models/todoItems.js");

router.post("/api/item", async (req, res) => {
  try {
    const newItem = todoItemsModel({
      item: req.body.item,
    });
    //save this item in database
    const saveItem = await newItem.save();
    res.status(200).json(newItem);
  } catch (error) {
    res.json(error);
  }
});

//get data from database
router.get("/api/items", async (req, res) => {
  try {
    const allTodoItems = await todoItemsModel.find({});
    res.status(200).json(allTodoItems);
  } catch (error) {
    res.json(err);
  }
});
//update item
router.put("/api/item/:id", async (req, res) => {
  try {
    //find item and update
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("item updated");
  } catch (error) {
    res.json(err);
  }
});

//delete item
router.delete("/api/item/:id", async (req, res) => {
  try {
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json("item deleted");
  } catch (error) {
    res.json(err);
  }
});

module.exports = router;
