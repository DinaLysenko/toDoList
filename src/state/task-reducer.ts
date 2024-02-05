import {TasksType} from "../Todolist";

export const tasksReducer = (state: TasksType, action: ActionType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(s=>s.id!==action.taskId)}
        }
        default:
            return state
    }
}
type ActionType=RemoveTaskACType
type RemoveTaskACType=ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK', taskId, todolistId
    }as const
}