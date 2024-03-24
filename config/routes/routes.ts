import express from "express";
import students from "@/src/controller/studentsController";
import studentRoutes from './studentsRoutes'
import { authorize } from "./routesAuth";
import users from "@/src/controller/usersController";
//import csrf from 'csrf'
import csrf from 'csurf'

const routes = express.Router()

//Middleware controle csrf token
const csrfControl = csrf({})

//rota login do usuario
routes.get('/login', csrfControl, (req, res) => {
    res.render('login', { csrfToken: req.csrfToken() })
})

//rota privada, quando está autenticado
routes.get('/dashboard', csrfControl, authorize, students.list)

//rotas para estudantes (privado)
routes.use('/students', authorize, studentRoutes)
routes.post('/logout', authorize, users.logout)

//interação de login, register (público)
routes.post('/login', csrfControl, users.login)
routes.post('/register', csrfControl, users.create)


//todos os demais casos, são tratados por esse middleware
routes.all('*', authorize, (req, res) => res.redirect('/dashboard'))


export default routes