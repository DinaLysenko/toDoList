import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";
const initialState:TodolistsType[]=[]
export const todolistsReducer = (state=initialState, action: TodolistsReducer): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(s => s.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            let newTodolist: TodolistsType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(s => s.id === action.payload.id ? {...s, title: action.payload.title} : s)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(s => s.id === action.payload.id ? {...s, filter: action.payload.filter} : s)
        }
        default:
            return state
    }
}
type TodolistsReducer = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleAC | ChangeTodolistFilterAC
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleAC = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterAC = ReturnType<typeof changeTodolistFilterAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title, todolistId: v1()}
    } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {id, title}
    } as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {id, filter}
    } as const
}