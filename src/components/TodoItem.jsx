
export const TodoItem = ({description, idTodo}) => {
    return (
        <div className="mt-3 d-flex tarjeta">
            <div className="p-2 flex-grow-1">
                <p>{description}</p>
            </div>
            <div className="p-2">
                <button className="btn btn-warning">Editar</button>
            </div>
            <div className="p-2">
                <button className="btn btn-danger">Eliminar</button>
            </div>
        </div>
    )
}
