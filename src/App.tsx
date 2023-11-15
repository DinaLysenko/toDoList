import React, {useState} from 'react';
import './App.css';
import {TasksPropsType, TodoList} from "./components/TodoList";

export type FilterType = 'all' | 'completed' | 'active'

function App() {
    let [tasks, setTasks] = useState<TasksPropsType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest API", isDone: false},
        {id: 5, title: "GraphQL", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterType>('all')

    let filteredTasks = tasks

    if (filter === 'active') {
        filteredTasks = tasks.filter(t=>!t.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t=>t.isDone)
    }
const changeFilter=(nameButton:FilterType)=>{
        setFilter(nameButton)
}
    const removeTasks = (taskId: number) => {
        tasks = tasks.filter(t => t.id !== taskId)
        setTasks(tasks)
    }

    return (
        <div className="App">
            <TodoList title='What to learn' tasks={filteredTasks} removeTasks={removeTasks} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
