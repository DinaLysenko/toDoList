import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
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
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: string
}
export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}
export const TodoList: React.FC<TodolistPropsType> = (props) => {
    const {tasks, title, removeTasks, changeFilter, newTitle, setNewTitle, addTask, changeTaskStatus, filter} = props
    const [error, setError] = useState<string | null>(null)
    const onClickHandler = () => {
        if (newTitle.trim() && newTitle !== '') {
            addTask(newTitle.trim())
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter" && newTitle.trim() && newTitle !== '') {
            addTask(newTitle.trim())
        }
    }
    const onClickAllHandler = () => {
        changeFilter('all')
    }
    const onClickActiveHandler = () => {
        changeFilter('active')
    }
    const onClickCompletedHandler = () => {
        changeFilter('completed')
    }

    return (
        <S.TodoList>
            <h3>{title}</h3>
            <div>
                <input onChange={onChangeHandler} value={newTitle} onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={onClickHandler}>+</button>
            </div>
            {error ? <div className={'error-message'}><span>{error}</span></div> : ''}
            <ul>
                {tasks.map(t => {
                        const removeMappedTasks = () => {
                            removeTasks(t.id)

                        }
                        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(t.id, e.currentTarget.checked)
                        }
                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type='checkbox' checked={t.isDone} onChange={onChangeTaskStatus}/>
                            <span>{t.title}</span>
                            <button onClick={removeMappedTasks}>✖️</button>
                        </li>
                    }
                )
                }
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''} onClick={onClickAllHandler}>All
                </button>
                <button className={filter === 'active' ? 'active-filter' : ''} onClick={onClickActiveHandler}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onClickCompletedHandler}>Completed
                </button>
            </div>
        </S.TodoList>
    )
        ;
};

