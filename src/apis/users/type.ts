export interface SigninRequestType {
    accountId: string,
    password: string,
    checkPassword: string,
    nickname: string,
}

export interface LoginRequestType {
    accountId: string,
    password: string
}