
import User from "@/src/model/user";
//type customizada
declare module 'express-session' {
    interface SessionData {
        user: User;
    }
}