import { TodoItem } from "./TodoItem"

export const TodoList = ({ toDos, handleToDos}) => {
    return (
        <div className="todo-list mt-3">
            {
                
                toDos.slice().sort((a,b)=>b.id-a.id).map(todo => {
                    return (
                        <TodoItem key={todo.id} description={todo.description} idTodo={todo.id} handleToDos={handleToDos} done={todo.done}/>   
                    )
                })
            }
        </div>
    )
}
