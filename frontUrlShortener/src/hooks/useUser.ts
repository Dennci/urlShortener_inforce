import {useAppDispatch, useAppSelector} from "../store/store";
import {
    logIn,
    logOut,
    selectedUserEmail,
    selectedUserId,
    selectedUserRole,
    selectedUserToken
} from "../store/user.slice";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


export const useUser = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(selectedUserId)
    const token = useAppSelector(selectedUserToken)
    const userEmail = useAppSelector(selectedUserEmail)
    const userRole = useAppSelector(selectedUserRole)
    const navigate = useNavigate();

    useEffect(() => {
        if (!token)
            dispatch(logIn())
    }, [token]);

    const isAuthenticated = token === undefined ? token : !!token;

    const logout = () => {
        dispatch(logOut());
        localStorage.removeItem("token");
        navigate('/user/login')
    }
    const redirectToLogin = (func: () => Promise<void>) => {
        if (isAuthenticated) {
            func();
            return;
        }
        navigate('/user/login')
    }

    return {
        isAuthenticated: isAuthenticated,
        redirectToLogin,
        logout,
        userEmail,
        userRole,
        userId
    };
}