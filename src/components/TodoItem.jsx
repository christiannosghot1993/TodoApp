
import { useState } from "react"
import { ModalEdit } from './ModalEdit';

export const TodoItem = ({ description, idTodo, handleToDos, done }) => {
    const [showModal, setshowModal] = useState(false);
    const [terminado, setTerminado] = useState(done)
    const handleShowModal = () => {
        setshowModal(true);
    };
    const handleDelete = async () => {
        const requestOptions = {
            method: 'DELETE',
        };

        const response = await fetch('https://localhost:44379/api/ToDoes/' + idTodo, requestOptions);
        if (!response.ok) {
            console.log(response)
            throw new Error('Error en la petición a la API');
        } else {
            handleToDos(x => {
                return x.filter(z => z.id !== idTodo);
            });
        }
    };
    const handleDone = async () => {
        setTerminado(!terminado);
        handleToDos(t=>{
            const newTodo=[
                ...t
            ];
            return newTodo.map(task=>{
                if(task.id===idTodo){
                    task.done= !terminado;
                    return task;
                }
                return task;
            });
        });
        const data = {
            id: idTodo,
            description,
            done: !terminado
        };
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Especificamos que estamos enviando datos en formato JSON
            },
            body: JSON.stringify(data), // Convertimos los datos a formato JSON y los enviamos en el cuerpo de la solicitud
        };

        const response = await fetch('https://localhost:44379/api/ToDoes/' + idTodo, requestOptions);
        if (!response.ok) {
            console.log(response)
            throw new Error('Error en la petición a la API');
        } 
    };

    return (
        <>
            <div className={'animate__animated animate__rubberBand mt-3 d-flex ' + (terminado ? 'tarjeta-done' : 'tarjeta' )} >
                <div className="p-2 flex-grow-1">
                    <p>{description}</p>
                </div>
                <div className="p-2">
                    <button type="button" className={'btn btn-'+(terminado?'info':'success')} onClick={handleDone} >{ terminado?'Activar':'Terminar'} </button>
                </div>
                <div className="p-2">
                    <button type="button" className="btn btn-warning" onClick={handleShowModal}>Editar</button>
                </div>
                <div className="p-2">
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
                </div>
            </div>
            {
                showModal && <ModalEdit handleCloseModal={setshowModal} idEditar={idTodo} 
                descriptionEditar={description} handleToDos={handleToDos}/>
            }
        </>
    )
}
