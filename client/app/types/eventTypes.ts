export type CreateEvent = {
    name: string,
    description: string,
    date:string,
    totalTickets: number
}

export type UpdateEvent = {
    name?: string,
    description?: string,
    date?:string,
    totalTickets?: number
}