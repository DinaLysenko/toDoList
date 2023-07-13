import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import S from 'resolve-from'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error, setError] = useState<null | string>(null)
    const[nameButton, setNameButton]=useState('all')
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    const totalButtonClickHandler=(value:FilterValuesType)=>{
        props.changeFilter(value)
        setNameButton(value)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} className={error ? 'error':''}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error&&<div className={'errorMessage'}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(t.id, newIsDoneValue)
                    }

                    return <li key={t.id} className={t.isDone? 'isDone':''}>
                        <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={nameButton ==='all'?'activeFilter':''} onClick={()=>totalButtonClickHandler('all')}>All</button>
            <button className={nameButton ==='active'?'activeFilter':''} onClick={()=>totalButtonClickHandler('active')}>Active</button>
            <button className={nameButton ==='completed'? 'activeFilter' :''} onClick={()=>totalButtonClickHandler('completed')}>Completed</button>
        </div>
    </div>
}
