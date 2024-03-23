import { NextFunction } from "express";
import { Request, Response } from "express";


/**
 * Verifica se o usuario está logado. Se estiver retorna ao próximo middleware,
 * senão manda para o login
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const authorize = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.session || !req.session.user) {
        return res.redirect('/login')
    }

    //proximo middleware
    next()

}