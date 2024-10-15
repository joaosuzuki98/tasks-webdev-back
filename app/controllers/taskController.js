const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createTask = async (req, res) => {
    const { tas_name, tas_day, tas_status } = req.body

    try {
        const task = await prisma.task.create({
            data: {
                tas_name: tas_name,
                tas_day: tas_day,
                tas_status: tas_status
            }
        })

        return res.status(200).json(task)
    } catch(err) {
        if (err.code === 'P2002') {
            return res.status(400).json({
                error: `Task ${tas_name} already exists.`
            })
        }
        return res.status(400).json({error: err})
    }
}

const showManyTasks = async (req, res) => {
    const status = req.query.status

    try {
        let tasks
        if (status !== undefined) {
            const isActive = status === 'true'
            tasks = await prisma.task.findMany({
                where: {
                    tas_status: isActive
                }
            })
        } else {
            tasks = await prisma.task.findMany()
        }

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