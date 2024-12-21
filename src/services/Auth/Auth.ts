import {request} from "../Client.ts";
import {Auth} from "../Endpoints.ts";
import {LoginRequestParams, RegisterRequestParams} from "./authInterface.ts";

export const postApply = (params: RegisterRequestParams) => request('post', Auth.register, params)
export const postLogin = (params: LoginRequestParams): Promise<any> => request('post', Auth.login, params)
