const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const Joi = require('joi')
const valid = require('./validation/joiSchema') // JOI VALIDATION

const Todo = require('../models').Todo // MODEL

const errHandler = err => {
    console.error(err)
}

function isIdUnique (todoid) {
    return Todo.count({ where: { id: todoid } })
      .then(count => {
        if (count == 1) {
          return true;
        }
        return false;
    });
}

const TodoController = {
    getTodoList: async (req, res) => {
        try {
            const todos = await Todo.findAll();
            return res.send({todos});
        } catch (error) {
            console.error(error);
            return res.send({error});
        }
    },

    getTodo: async (req, res) => {
        const {value, error} = Joi.validate(req.params, valid.idTodo)
        if(error){
            return res.send({error:error.details[0].message})
        }

        try {
            const todo = await Todo.findOne({
                where: {
                    id: req.params.todoid
                }
            })
            return res.send({ todo })
        } catch (error){
            console.error(error);
            return res.send({error});
        }
    },

    addTodo: async (req, res) => {
        const {value, error} = Joi.validate(req.body, valid.addTodoSchema)
        if(error){
            return res.send({error:error.details[0].message})
        }

        try {
            const todo = await Todo.create({
                name: req.body.name,
                body: req.body.body
            })
            return res.send({ todo })
        } catch (error) {
            console.error(error);
            return res.send({error});
        }
    },

    editTodoName: async (req, res) => {
        const {value, error} = Joi.validate(req.body, valid.editTodoName)
        if(error){
            return res.send({error:error.details[0].message})
        }

        try {
            const isUnique = await isIdUnique(req.body.todoid)
            if(isUnique){
                await Todo.update({
                    name: req.body.name
                },{
                    where: {
                        id: req.body.todoid
                    }
                })
                return res.send({success: 'success'})
            } else {
                res.send({err: 'Todo not present'})
            }
        } catch (error) {
            console.error(error);
            return res.send({error});
        }
    },

    editTodoBody: (req, res) => {
        const {value, error} = Joi.validate(req.body, valid.editTodoBody)
        if(error){
            return res.send({error:error.details[0].message})
        }

        isIdUnique(req.body.todoid).then(isUnique => {
            if (isUnique) {
                Todo.update({
                    body: req.body.body
                },{
                    where: {
                        id: req.body.todoid
                    }
                })
                .then(() => res.send({success: 'success'}))
                .catch(errHandler)
            }else{
                res.send({err: 'Todo not present'})
            }
        });
    },

    deleteTodo: async (req, res) => {
        const {value, error} = Joi.validate(req.params, valid.idTodo)    
        if(error){
            return res.send({error:error.details[0].message})
        }

        try {
            const isUnique = await isIdUnique(req.params.todoid)
            if(isUnique){
                await Todo.destroy({
                    where: {
                        id: req.params.todoid
                    }
                })
                return res.send({success: 'success'})
            } else {
                res.send({err: 'Todo not present'})
            }
        } catch (error) {
            console.error(error);
            return res.send({error});
        }
    },

    markTodo: (req, res) => {
        const {value, error} = Joi.validate(req.body, valid.markTodo)
        if(error){
            return res.send({error:error.details[0].message})
        }

        isIdUnique(req.body.todoid).then(isUnique => {
            if (isUnique) {
                Todo.update({
                    completed: req.body.done
                },{
                    where: {
                        id: req.body.todoid
                    }
                })
                .then(() => res.send({success: 'success'}))
                .catch(errHandler)
            }else{
                res.send({err: 'Todo not present'})
            }
        });
    },

    getTodoPagination: (req, res) => {
        const {value, error} = Joi.validate(req.body, valid.getTodoPagination)
        if(error){
            return res.send({error:error.details[0].message})
        }

        let offset = (req.body.page_no-1)*req.body.rows
        Todo.findAll({
            offset: offset,
            limit: req.body.rows,
            order: ['createdAt']
        })
        .then(todos => {
            res.send(todos)
        })
        .catch(errHandler)
    },

    getTodoSearch: (req, res) => {
        const {value, error} = Joi.validate(req.params, valid.getTodoSearch)
        if(error){
            return res.send({error:error.details[0].message})
        }

        let offset = (req.params.page_no-1)*req.params.rows
        Todo.findAll({
            offset: offset,
            limit: parseInt(req.params.rows),
            where: {
                [Op.or]: {
                    name: {
                        [Op.like]: '%'+req.params.keyword+'%'
                    },
                    body: {
                        [Op.like]: '%'+req.params.keyword+'%'
                    }
                }
            },
            order: ['createdAt']
        })
        .then(todos => {
            res.send(todos)
        })
        .catch(errHandler)
    }
}

module.exports = TodoController