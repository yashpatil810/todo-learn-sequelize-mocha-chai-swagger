const express = require('express');
const router = express.Router();

const controller = require('../controller/todoController') 
router.get('/get-todo-list', (controller.getTodoList))    
router.get('/get-todo/:todoid', (controller.getTodo))  
router.post('/add-todo', (controller.addTodo))
router.put('/edit-todo-name', (controller.editTodoName))
router.put('/edit-todo-body', (controller.editTodoBody))
router.delete('/delete-todo/:todoid', (controller.deleteTodo))
router.put('/mark-todo', (controller.markTodo))
router.post('/get-todo-pagination', (controller.getTodoPagination))
router.get('/get-todo-search/:page_no/:rows/:keyword', (controller.getTodoSearch))

module.exports = router