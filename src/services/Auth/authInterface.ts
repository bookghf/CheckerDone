export interface RegisterRequestParams {
    email: string,
    username: string,
    password: string,
}

export interface RegisterResponseParams {
    message: string,
    jwt: string,
}

export interface LoginRequestParams {
    email: string,
    password: string,
}

export interface LoginResponseParams {
    message: string,
    jwt: string,
}
