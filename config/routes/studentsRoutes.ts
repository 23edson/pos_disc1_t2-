import express from 'express'
import students from '@/src/controller/studentsController'

const routes = express.Router()

//rota base : /students/any
routes.post('/new', students.create)
routes.delete('/:id', students.delete)
routes.post('/:id', students.update, students.list)
routes.get('/:id', students.show)

export default routes