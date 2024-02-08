import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './component/AddItemForm';
import {EditableSpan} from './component/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, Checkbox} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootReducerType} from './state/store';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/task-reducer';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: TaskType[]
}

type PropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
}

export function TodolistWithRedux(props: PropsType) {
    let tasks = useSelector<AppRootReducerType, TaskType[]>(state => state.tasks[props.todoListId])
    const dispatch = useDispatch()

    if (props.filter === 'active') {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone);
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(props.todoListId, 'all'));
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(props.todoListId, 'active'));
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(props.todoListId, 'completed'));

    const todoListRemoveHandler = () => {
        dispatch(removeTodolistAC(props.todoListId))
    }
    const addTask = (title: string) => (
        dispatch(addTaskAC( title, props.todoListId))
    )
    const onChangeTodolist = (newTitle: string) => {
        dispatch(changeTodolistTitleAC(props.todoListId, newTitle))
    }
    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={onChangeTodolist}/>
            <IconButton aria-label="delete" onClick={todoListRemoveHandler}>
                <DeleteIcon/>
            </IconButton>
            <AddItemForm addFormTitle={addTask}/>
        </h3>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC( t.id, props.todoListId))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.todoListId));
                    }
                    const changeTaskHandler = (newTitle: string) => {
                        dispatch(changeTaskTitleAC( t.id, newTitle, props.todoListId))
                    }
                    return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox defaultChecked onChange={onChangeHandler}
                                  checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={changeTaskHandler}/>
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
