import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
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

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

function AppWithReducer() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    function removeTask(todoListId: string, id: string) {
        dispatchTasks(removeTaskAC(id, todoListId))
    }

    function addTask(todoListId: string, title: string) {
        dispatchTasks(addTaskAC(title, todoListId))
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        dispatchTasks(changeTaskStatusAC(taskId,isDone, todoListId))
    }

    function changeTask(todoListId: string, taskId: string, newTitle: string) {
      dispatchTasks(changeTaskTitleAC(taskId, newTitle, todoListId))
    }

    function changeTodolist(todoListId: string, newTitle: string) {
        dispatchTodolists(changeTodolistTitleAC(todoListId, newTitle))
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        dispatchTodolists(changeTodolistFilterAC(todoListId, value))
    }

    const todoListRemove = (todoListId: string) => {
        const action=removeTodolistAC(todoListId)
       dispatchTodolists(action)
       dispatchTasks(action)
    }
    const addTodolist = (title: string) => {
        const action=addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
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

export default AppWithReducer;
