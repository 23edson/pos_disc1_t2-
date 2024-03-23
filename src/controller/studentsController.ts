import { Request, Response, NextFunction } from "express"
import Student from "@/src/model/student"
import dayjs from "dayjs"
import User from "../model/user"
import users from "./usersController"

const students = {

    /**
     * Lista todos os students do banco de dados
     * @param req 
     * @param res
     * @route GET /dashboard 
     * @returns 
     */
    async list(req: Request, res: Response) {

        try {

            //select * from students left join users
            const students = await Student.findAll({
                include: [{
                    model: User, as: 'user'
                }]
            }).then((students) => {

                return students.map((student) => {

                    return {
                        ...student.toJSON(),
                        birthday: dayjs(student.birthday).format('DD/MM/YYYY'),
                        login: student.user?.login
                    }
                })
            })

            //select * from users
            const allUsers = await users.list()

            //passa os dados para a view students
            return res.render('students', { students, users: allUsers, loggedUser: req.session.user?.login })

        } catch (error) {
            console.log(error)
            return res.render('layout/error')
        }

    },

    /**
     * Método responsável por buscar um usuario  pelo id 
     * @param req 
     * @param res
     * @route GET /students/:id 
     * @returns 
     */
    async show(req: Request, res: Response) {

        try {
            const { id } = req.params

            const allUsers = await users.list()

            const student = await Student.findOne({ where: { id } }).then((student) => {
                if (student)
                    return {
                        ...student.toJSON(),
                        birthday: dayjs(student?.birthday).format('YYYY-MM-DD'),
                    }
                return null
            })

            res.render('editStudent', {
                student,
                users: allUsers,
                loggedUser: req.session.user?.login
            })
        } catch (error) {
            console.log(error)
            return res.render('layout/error')
        }
    },

    /**
     * Cria um novo registro no banco
     * @param req 
     * @param res
     * @route POST /students/new
     * @returns 
     */
    async create(req: Request, res: Response) {

        try {

            const { student, birthday, user } = req.body

            if (student && birthday && user) {

                //insert into students
                await Student.create({
                    name: student,
                    birthday: dayjs(birthday).locale('pt-BR'),
                    user_id: user
                })
            }

            //redirecionado para a listagem
            res.redirect('/dashboard')

        } catch (error) {
            console.log(error)
            return res.render('layout/error')
        }
    },

    /**
     * Método para atualizar um student
     * @param req 
     * @param res 
     * @param next
     * @route POST /students/:id 
     * @returns 
     */
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const { student, birthday, user } = req.body

            await Student.update({
                name: student,
                birthday,
                user_id: user
            }, { where: { id } })

            //chama middleware que redireciona para dashboard
            next()
        } catch (error) {
            console.log(error)
            return res.render('layout/error')

        }
    },

    /**
     * Remove um registro do banco de dados 
     * @param req 
     * @param res
     * @route  DELETE /students/:id
     * @returns 
     */
    async delete(req: Request, res: Response) {

        try {

            const { id } = req.params

            if (id) {

                //delete from students
                await Student.destroy({ where: { id: id } })
            }

            //redirecionado para a listagem
            res.redirect('/')

        } catch (error) {
            console.log(error)
            return res.render('layout/error')
        }
    },

}

export default students