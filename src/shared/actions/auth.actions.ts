import { Action } from "@ngrx/store";
import { Auth } from "../models/auth.model";
import { UserModel } from "../models/user.model";

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const UPDATE_USERINFO = '[Auth] UpdateUserinfo';

export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload: Auth){}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class UpdateUserinfo implements Action {
    readonly type = UPDATE_USERINFO;

    constructor(public payload: object){}
}

export type All
    = Login
    | Logout
    | UpdateUserinfo;