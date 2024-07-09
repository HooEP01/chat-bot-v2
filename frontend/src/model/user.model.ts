export interface User {
    username: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    birth_date: string,
}

export interface LoginForm {
    email: string,
    password: string,
}

export interface RegisterForm {
    username?: string,
    email: string,
    password: string,
    first_name?: string,
    last_name?: string,
    birth_date?: string,
}