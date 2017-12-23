import { Auth } from "../models/auth.model";
import * as AuthActions from "../actions/auth.actions"

export type Action = AuthActions.All;

export const authReducer = (state: Auth = {
  user: null,
  isLogin: false,
  errMsg: null,
  redirectUrl: null
}, action: Action) => {
  switch (action.type) {
    case AuthActions.LOGIN:
      return Object.assign({}, action.payload, { hasError: false });
    case AuthActions.LOGOUT:
      return Object.assign({}, state, {
        user: null,
        isLogin: false,
        errMsg: 'no credentials',
        redirectUrl: ''
      });
    case AuthActions.UPDATE_USERINFO:
      //更新store中的用户信息
      Object.assign(state.user, action.payload);
      return state;
    default:
      return state;
  }
}
