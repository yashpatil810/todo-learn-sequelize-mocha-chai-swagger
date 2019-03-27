const Joi = require('joi')

const validation = {}

validation.todoid = Joi.number().positive().required()
validation.name = Joi.string().required()
validation.body = Joi.string().required()
validation.done = Joi.boolean().required()
validation.page_no = Joi.number().min(1).required()
validation.rows = Joi.number().min(1).required()
validation.keyword = Joi.string().required()

validation.addTodoSchema = Joi.object().keys({
    name: validation.name,
    body: validation.body
})

validation.editTodoName = Joi.object().keys({
    name: validation.name,
    todoid: validation.todoid
})

validation.editTodoBody = Joi.object().keys({
    body: validation.body,
    todoid: validation.todoid
})

validation.idTodo = Joi.object().keys({
    todoid: validation.todoid
})

validation.markTodo = Joi.object().keys({
    todoid: validation.todoid,
    done: validation.done
})

validation.getTodoPagination = Joi.object().keys({
    page_no: validation.page_no,
    rows: validation.rows
})

validation.getTodoSearch = Joi.object().keys({
    keyword: validation.keyword,
    page_no: validation.page_no,
    rows: validation.rows
})

module.exports = validation