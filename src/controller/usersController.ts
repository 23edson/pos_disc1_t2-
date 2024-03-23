import { createHash } from "crypto"
import { Request, Response, } from "express"
import User from "../model/user"


const users = {

    //lista de todos os usuarios, formato para select
    async list() {
        return await User.findAll().then((response) => {
            return response.map((item) => {
                return {
                    value: item.id,
                    label: item.login,
                }
            })
        })
    },

    /**
     * cria um novo usuario
     * @param req 
     * @param res
     * @route POST /register
     * @returns 
     */
    async create(req: Request, res: Response) {

        try {

            const { login, password, } = req.body

            //cria o hash da senha
            const hashpwrd = createHash("sha256").update(password).digest('hex')

            if (login && hashpwrd) {
                //insert into users
                await User.create({
                    login: login,
                    password: hashpwrd,
                })
            }

            //redirecionado para o login
            res.render('login', { created: true })


        } catch (error) {
            console.log(error)
            return res.render('layout/error')
        }
    },

    /**
     * Método de login
     * @param req 
     * @param res
     * @route POST /login 
     * @returns 
     */
    async login(req: Request, res: Response) {

        try {

            const { login, password } = req.body

            //pega o hash do password submetido
            const hashpwrd = createHash("sha256").update(password).digest('hex')

            const user = await User.findOne({ where: { login: login, password: hashpwrd } })

            if (user) {

                //se achou o usuário, coloca os dados na sessão
                req.session.user = user
                return res.status(200).redirect('/dashboard')
            }

            throw new Error("Login or Password incorrect")

        } catch (error: any) {
            console.log(error)
            return res.render('login', { error: true })
        }
    },

    /**
     * Método de logout
     * @param req 
     * @param res
     * @route POST /logout 
     * @returns 
     */
    async logout(req: Request, res: Response) {

        try {
            //apenas exclui a sessão e redireciona o usuário
            req.session.destroy(() => res.status(200).redirect('/login'));

        }
        catch (error: any) {
            return res.render('layout/error')
        }
    }
}

export default users