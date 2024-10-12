const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createTask = async (req, res) => {
    const { name, day } = req.body

    try {
        const task = await prisma.task.create({
            data: {
                tas_name: name,
                tas_day: day
            }
        })

        return res.status(200).json(task)
    } catch(err) {
        return res.status(400).json({error: err})
    }
}

const showManyTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany()
        return res.status(200).json(tasks)
    } catch(err) {
        return res.status(500).json({error: err})
    }
}

const showOneTask = async (req, res) => {
    const taskName = req.params.name

    try {
        const task = await prisma.task.findUnique({
            where: {
                tas_name: taskName
            }
        })
        return res.status(200).json(task)
    } catch(err) {
        return res.status(400).json({error: err})
    }
}

const updateTask = async (req, res) => {
    const taskName = req.params.name
    const { name, day } = req.body

    try {
        const task = await prisma.task.update({
            where: {
                tas_name: taskName
            },
            data: {
                tas_name: name,
                tas_day: day
            }
        })
        return res.status(200).json(task)
    } catch(err) {
        return res.status(400).json({error: err})
    }
}

const deleteTask = async (req, res) => {
    const taskName = req.params.name

    try {
        const task = await prisma.task.delete({
            where: {
                tas_name: taskName
            }
        })
        return res.status(200).json(task)
    } catch(err) {
        return res.status(400).json({error: err})
    }
}

module.exports = {
    createTask,
    showManyTasks,
    showOneTask,
    updateTask,
    deleteTask
}