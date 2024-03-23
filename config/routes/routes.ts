import express from "express";
import students from "@/src/controller/studentsController";
import studentRoutes from './studentsRoutes'
import { authorize } from "./routesAuth";
import users from "@/src/controller/usersController";
const routes = express.Router()


//rota login  do usuario
routes.get('/login', (req, res) => {
    res.render('login')
})

//rota privada, quando está autenticado
routes.get('/dashboard', authorize, students.list)

//rotas para estudantes (privado)
routes.use('/students', studentRoutes)

//interação de login, logout e register (público)
routes.post('/login', users.login)
routes.post('/register', users.create)
routes.post('/logout', authorize, users.logout)


//todos os demais casos, são tratados por esse middleware
routes.all('*', authorize, (req, res) => res.redirect('/dashboard'))


export default routes