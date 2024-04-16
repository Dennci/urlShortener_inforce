
import {Session, UserRole} from "./models/user.models";
import jwt_decode from "jwt-decode";
const userTokenKey="token";
export const getToken = (): Session => {
    const tokenString = localStorage.getItem(userTokenKey) ?? "";
    const session:Session={
        Id: 0,
        UserEmail: "",
        UserRole: UserRole.User,
        Token: tokenString
    }
    if (!tokenString) return session;

    const decoded = jwt_decode(tokenString) as any;
    return {
        ...session,
        ...decoded
    };
};