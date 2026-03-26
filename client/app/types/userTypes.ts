export type CreateUser = {
    name: string,
    email:string,
    password:string
}

export type UpdateUser = {
    name?: string,
    email?:string,
    password?:string
}