import React, {useState} from 'react';
import './App.css';
import {TasksPropsType, TodoList} from "./components/TodoList";
import {v1} from "uuid";

export type FilterType = 'all' | 'completed' | 'active'

function App() {
    let [tasks, setTasks] = useState<TasksPropsType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterType>('all')
    const [newTitle, setNewTitle]=useState('')
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
    const addTask=(newTitle:string)=>{
        const newTask={id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
        setNewTitle('')
    }
    const removeTasks = (taskId: string) => {
        tasks = tasks.filter(t => t.id !== taskId)
        setTasks(tasks)
    }
    const changeTaskStatus=(taskId:string, isDone: boolean)=>{
        const task = tasks.find(t=> t.id === taskId)
        if(task){
            task.isDone=isDone
        }
        setTasks([...tasks])
    }

    return (
        <div className="App">
            <TodoList title='What to learn'
                      tasks={filteredTasks}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      newTitle={newTitle}
                      setNewTitle={setNewTitle}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
