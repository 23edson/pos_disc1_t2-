import express from 'express'
import { authorize } from './routesAuth'
import students from '@/src/controller/studentsController'

const routes = express.Router()

//rota base : /students/any
routes.post('/new', students.create)
routes.delete('/:id', authorize, students.delete)
routes.put('/:id', authorize, students.update)
routes.get('/:id', authorize, students.show)

export default routes