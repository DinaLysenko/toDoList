import React from 'react';
import {S} from './TodoList-Styles'

type TodolistPropsType = {
    tasks: TasksPropsType[]
    title: string
}
export type TasksPropsType = {
    id: number
    title: string
    isDone: boolean
}
export const TodoList: React.FC<TodolistPropsType> = ({tasks, title}) => {
    return (
        <S.TodoList>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li  key={tasks[0].id}><input type='checkbox' checked={tasks[0].isDone}/> <span>{tasks[0].title}</span></li>
                <li key={tasks[1].id}><input type='checkbox' checked={tasks[1].isDone}/> <span>{tasks[1].title}</span></li>
                <li key={tasks[2].id}><input type='checkbox' checked={tasks[2].isDone}/> <span>{tasks[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </S.TodoList>
    );
};

