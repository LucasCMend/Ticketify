import { CreateEvent, UpdateEvent } from "../types/eventTypes";
import api from "./api";

export const createEvent = (data: CreateEvent) => {
    return api.post('/events', data)
}

export const updateEvent = (id:string, data:UpdateEvent) => {
    return api.put(`/events/${id}`, data)
}

export const deleteEvent = (id:string) => {
    return api.delete(`/events/${id}`)
}

export const findEvent = (id:string) => {
    return api.get(`/events/${id}`)
}

export const findManyEvents = () => {
    return api.get('/events?onlyUpcoming=true')
}