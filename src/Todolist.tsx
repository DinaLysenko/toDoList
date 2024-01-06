import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./component/AddItemForm";
import {EditableSpan} from "./component/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, Checkbox} from "@mui/material";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TasksType = {
    [key: string]: TaskType[]
}

type PropsType = {
    todoListId: string
    title: string
    tasks: TasksType
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todoListRemove: (todoListId: string) => void
    changeTask: (todoListId: string, taskId: string, newTitle: string) => void
    changeTodolist: (todoListId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    let tasksForTodolist = props.tasks[props.todoListId];

    if (props.filter === "active") {
        tasksForTodolist = props.tasks[props.todoListId].filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks[props.todoListId].filter(t => t.isDone);
    }

    const onAllClickHandler = () => props.changeFilter(props.todoListId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todoListId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoListId, "completed");

    const todoListRemoveHandler = () => {
        props.todoListRemove(props.todoListId)
    }
    const addTask = (title: string) => (
        props.addTask(props.todoListId, title)
    )
    const onChangeTodolist = (newTitle: string) => {
        props.changeTodolist(props.todoListId, newTitle)
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
                tasksForTodolist.map(t => {
                    const onClickHandler = () => props.removeTask(props.todoListId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todoListId, t.id, e.currentTarget.checked);
                    }
                    const changeTaskHandler = (newTitle: string) => {
                        props.changeTask(props.todoListId, t.id, newTitle)
                    }
                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
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
            <Button variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? "contained" : "text"} 
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
