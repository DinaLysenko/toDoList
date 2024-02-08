import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from './task-reducer';
import {todolistsReducer} from './todolists-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
export const store = legacy_createStore(rootReducer)
export type AppRootReducerType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store