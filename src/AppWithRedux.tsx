import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./component/AddItemForm";
import {ButtonAppBar} from "./component/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/task-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootReducerType} from './state/store';

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

function AppWithRedux() {
    const tasks=useSelector<AppRootReducerType, TasksType>(state => state.tasks)
    const todolists=useSelector<AppRootReducerType, TodolistsType[]>(state => state.todolists)
    const dispatch=useDispatch()


    function removeTask(todoListId: string, id: string) {
        dispatch(removeTaskAC(id, todoListId))
    }

    function addTask(todoListId: string, title: string) {
        dispatch(addTaskAC(title, todoListId))
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(taskId,isDone, todoListId))
    }

    function changeTask(todoListId: string, taskId: string, newTitle: string) {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId))
    }

    function changeTodolist(todoListId: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(todoListId, newTitle))
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todoListId, value))
    }

    const todoListRemove = (todoListId: string) => {
        const action=removeTodolistAC(todoListId)
        dispatch(action)
    }
    const addTodolist = (title: string) => {
        const action=addTodolistAC(title)
        dispatch(action)
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addFormTitle={addTodolist}/>
                </Grid>
                <Grid container spacing={3}  >
                {todolists.map(t => {
                    return <Grid  key={t.id} item style={{padding:'20px'}} justifyContent={'space-around'}>
                        <Paper elevation={5} style={{padding:'20px'}}>
                        <Todolist
                            key={t.id}
                            todoListId={t.id}
                            title={t.title}
                            tasks={tasks}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={t.filter}
                            todoListRemove={todoListRemove}
                            changeTask={changeTask}
                            changeTodolist={changeTodolist}
                        />
                        </Paper>
                    </Grid>
                })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
