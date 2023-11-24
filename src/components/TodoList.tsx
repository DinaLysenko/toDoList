import React, {ChangeEvent, KeyboardEvent} from 'react';
import {S} from './TodoList-Styles'
import {FilterType} from "../App";

type TodolistPropsType = {
    tasks: TasksPropsType[]
    title: string
    removeTasks: (taskId: string) => void
    changeFilter: (nameButton: FilterType) => void
    addTask: (newTitle: string) => void
    newTitle: string
    setNewTitle: (newTitle: string) => void
}
export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}
export const TodoList: React.FC<TodolistPropsType> = ({
                                                          tasks,
                                                          title,
                                                          removeTasks,
                                                          changeFilter,
                                                          newTitle,
                                                          setNewTitle,
                                                          addTask
                                                      }) => {

    const onClickHandler = () => {
        addTask(newTitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyDownHandler=(e: KeyboardEvent<HTMLInputElement>)=>{
         if(e.key==="Enter") {
             addTask(newTitle)
         }
    }
    const onClickAllHandler =()=>{
        changeFilter('all')
    }
    const onClickActiveHandler =()=>{
        changeFilter('active')
    }
    const onClickCompletedHandler =()=>{
        changeFilter('completed')
    }

    return (
        <S.TodoList>
            <h3>{title}</h3>
            <div>
                <input onChange={onChangeHandler} value={newTitle} onKeyDown={onKeyDownHandler}/>
                <button onClick={onClickHandler}>+</button>
            </div>
            <ul>
                {tasks.map(t => {
                    const removeMappedTasks=()=>{
                        removeTasks(t.id)
                    }
                        return <li key={t.id}><input type='checkbox' checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={removeMappedTasks}>✖️</button>
                        </li>
                    }
                )}
            </ul>
            <div>
                <button onClick={onClickAllHandler}>All</button>
                <button onClick={onClickActiveHandler}>Active</button>
                <button onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </S.TodoList>
    );
};

