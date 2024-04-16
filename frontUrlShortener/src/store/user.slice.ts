import {RootState} from "./store";
import {createDraftSafeSelector, createSlice} from "@reduxjs/toolkit";
import {getToken} from "../service/user.service";
import {Session, UserRole} from "../service/models/user.models";

interface UserAuthState {
    session: Session,
}

const initialState: UserAuthState = {
    session:{
        Id: 0,
        UserEmail: "",
        UserRole: UserRole.User,
        Token: undefined
    }
};
export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        logIn: (state) => {
            state.session = getToken()
        },
        logOut: (state) => {
            state.session = initialState.session;
        }
    }
})

export const {logIn,logOut} = userAuthSlice.actions

const userAuthState = (state: RootState) => state.userAuth

export const selectSession = createDraftSafeSelector(
    userAuthState,
    (state) => state.session
)

export const selectedUserId = createDraftSafeSelector(
    userAuthState,
    (state) => +(state?.session?.Id ?? 0)
)
export const selectedUserEmail = createDraftSafeSelector(
    userAuthState,
    (state) => state?.session?.UserEmail
)
export const selectedUserToken = createDraftSafeSelector(
    userAuthState,
    (state) => state.session.Token
)

export const selectedUserRole = createDraftSafeSelector(
    userAuthState,
    (state) => state.session.UserRole
)