import React from 'react';
import {S} from './TodoList-Styles'
import {FilterType} from "../App";

type TodolistPropsType = {
    tasks: TasksPropsType[]
    title: string
    removeTasks: (taskId:number)=>void
    changeFilter: (nameButton:FilterType)=>void
}
export type TasksPropsType = {
    id: number
    title: string
    isDone: boolean
}
export const TodoList: React.FC<TodolistPropsType> = ({tasks, title, removeTasks, changeFilter}) => {
    return (
        <S.TodoList>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(t => {
                        return <li key={t.id}><input type='checkbox' checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={()=>removeTasks(t.id)}>✖️</button>
                        </li>
                    }
                )}
            </ul>
            <div>
                <button onClick={()=>changeFilter('all')}>All</button>
                <button onClick={()=>changeFilter('active')}>Active</button>
                <button onClick={()=>changeFilter('completed')}>Completed</button>
            </div>
        </S.TodoList>
    );
};

