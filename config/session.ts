"use strict"

import session from 'express-session'
import SQLiteStore from 'connect-sqlite3'


const sqliteStore = SQLiteStore(session)

//configuracao de sessao com o sqlite
const initSession = () => {

    const store = new sqliteStore({
        table: 'sessions',
        db: 'sessions.sqlite',
    })

    return session({
        //@ts-ignore
        store: store,
        secret: 'secret_session',
        maxAge: 1000 * 60 * 60 * 3, //3 horas
        httpOnly: true,
        resave: false,
        saveUninitialized: false,
        name: 'newapp_sess',

    });
}


export default initSession;