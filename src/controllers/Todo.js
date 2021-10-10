const TodosModel = require('./../models/Todo.js')
const { validationResult } = require('express-validator');

const getAllTodos = async (req, res) => {
    if (req.query.page && req.query.limit) {
        let page = 1, limit = 10, skippedItems = 0;

        page = parseInt(req.query.page);
        limit = parseInt(req.query.limit);

        skippedItems = (page - 1) * limit;

        let query = TodosModel.find({}, {}, {
            skip: skippedItems, limit: limit
        });

        const data = await query.exec();

        res.json({
            success: true,
            data: {
                todos: data,
                page: page,
                limit: limit
            },
        });
    } else {
        const data = await TodosModel.find().all();

        res.json({
            success: true,
            data: {
                todos: data
            }
        })
    }
}

const getTodo = async (req, res) => {
    try {
        const item = await TodosModel.findOne({
            _id: req.params.id
        })

        return res.json({
            success: true,
            data: {
                item: item
            }
        })
    } catch (exception) {
        return res.json({
            success: false,
            data: {
                message: 'Object not found.'
            }
        })
    }
}

const createTodo = async (req, res) => {
    const errors = validationResult(req);

    if (! errors.isEmpty()) {
        return res.json({
            success: false,
            data: {
                ...errors
            }
        })
    }

    const item = await TodosModel.create({
        message: req.body.message,
        completed: false,
    })

    res.json({
        success: true,
        data: {
            item: item
        }
    })
}

const patchTodo = async (req, res) => {
    const errors = validationResult(req);

    if (! errors.isEmpty()) {
        return res.json({
            success: false,
            data: {
                ...errors
            }
        })
    }

    try {
        const item = await TodosModel.findOne({
            _id: req.params.id
        })

        item.message = req.body.message;
        item.completed = req.body.completed;
        item.save();

        return res.json({
            success: true,
            data: {
                item: item
            }
        })
    } catch (exception) {
        return res.json({
            success: false,
            data: {
                message: 'Object not found.'
            }
        })
    }
}

const deleteTodo = async (req, res) => {
    const id = req.params.id;

    try {
        const isDeleted = await TodosModel.deleteOne({
            _id: id
        })

        return res.json({
            success: true,
            data: {
                is_deleted: !!isDeleted.deletedCount
            }
        })
    } catch (exception) {
        return res.json({
            success: false,
            data: {
                message: 'Object not found.'
            }
        })
    }
}

module.exports = {getAllTodos, getTodo, createTodo, patchTodo, deleteTodo};