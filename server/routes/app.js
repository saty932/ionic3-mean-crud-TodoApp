var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var mongojs = require("mongojs");
var fs=require('fs');




// if our user.js file is at app/models/user.js
var Todo=require('../models/todo');


/*

var todo1=Todo({
  todoHeading:"THis is first i need to finish",
  todoData:"ohh god THis is first i need to finish"
});
// save the Todo
todo1.save(function(err) {
  if (err) throw err;
  console.log('new todo1 added!');
});




var todo2=Todo({
  todoHeading:"THis is second i need to finish",
  todoData:"ohh god THis is second i need to finish"
});
// save the Todo
todo2.save(function(err) {
  if (err) throw err;
  console.log('new todo2 added!');
});

*/




// Get All Todos
router.get('/todos', function(req, res, next){
  // get all the todos
  Todo.find({}, function(err, todos) {
    if (err) throw err;
    // object of all the todos
    res.json(todos);
  });
});



// Update Todo
router.put('/todo/:id', function(req, res, next){
  var todo = req.body;
  var UpdateTodo = {};
  UpdateTodo=todo;
  //console.log(UpdateTodo);
  if(!UpdateTodo){
    res.status(400);
    res.json({
      "error":"Bad Data"
    });
  } else {
   delete UpdateTodo._id;
   Todo.findByIdAndUpdate({_id: mongojs.ObjectId(req.params.id)},UpdateTodo,{new: true}, function(err, todo){
    if(err){
      res.send(err);
    }
    res.json(todo);
  });
 }
});


//Save Todo
router.post('/newtodo', function(req, res, next){
  var todo = req.body;
  //console.log(todo);
  if(!todo.todoData || !todo.todoHeading){
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  } else {
       var post = new Todo(todo);
    //save model to MongoDB
    post.save(function (err,todoItem) {
      if(err){
        res.json({success: false, msg:'Failed to add todo'});
      } else {
        res.json({success: true, msg:'todo is added',todo:todoItem});
      }
    });

  }
});


//removing from Todo item
router.delete('/removeFromTodo/:id', function(req, res, next){
  Todo.remove({_id: mongojs.ObjectId(req.params.id)}, function(err,todoItem){
    if(err){
      res.send(err);
    }
    res.json(todoItem);
  });
});



module.exports = router;
