import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== id)})
    }

    function addTask(todoListId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        setTodolists(todolists.map(t => t.id === todoListId ? {...t, filter: value} : t))
    }

    const todoListRemove = (todoListId: string) => {
        setTodolists(todolists.filter(t => t.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map(t => {
                return (
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
                    />
                )
            })}
        </div>
    );
}

export default App;
