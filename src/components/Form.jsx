
import React from "react";


export const Form = React.memo(({ handleSubmit, nextId }) => {
    const onSubmit = async (event) => {
        event.preventDefault();
        let todoDescription = event.target.elements.description.value;
        const newToDo = {
            id: nextId,
            description: todoDescription,
            done: false
        };
        const url = 'https://localhost:44379/api/ToDoes';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Especificamos que estamos enviando datos en formato JSON

            },
            body: JSON.stringify(newToDo), // Convertimos los datos a formato JSON y los enviamos en el cuerpo de la solicitud
        };
        const response = await fetch('https://localhost:44379/api/ToDoes', requestOptions);
        if (!response.ok) {
            throw new Error('Error en la petición a la API');
        }else{
            handleSubmit(x => {
                return [...x, newToDo]
            });
        }

        event.target.elements.description.value = '';
    };
    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Lista de tareas</h1>
            <form onSubmit={onSubmit} className="container">
                <div className="row">
                    <input name="description" type="text" className="col-sm-10 styled-input" id="exampleFormControlInput1" placeholder="name@example.com" />
                    <button className="btn btn-primary col-sm-1" >Crear</button>
                </div>
            </form>
        </>
    )
});
