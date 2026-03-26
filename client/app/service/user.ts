import { CreateUser, UpdateUser } from "../types/userTypes";
import api from "./api";

export const createUser = (data: CreateUser) => {
  return api.post("/users", data);
};

export const userLogin = (email:string, password:string) => {
    return api.post('/login', {email, password})
}

export const userLogout = () => {
    return api.post('/logout')
}

export const updateUser = (id: string, data: UpdateUser) => {
  return api.put(`/users/${id}`, data); 
};

export const deleteUser = (id: string) => {
  return api.delete(`/users/${id}`);
};

export const findUserById = (id:string) => {
    return api.get(`/users/${id}`)
}

export const findUserTickets = (id:string) => {
    return api.get(`/users/${id}/tickets`)
}