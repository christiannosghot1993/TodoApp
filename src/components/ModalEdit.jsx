import React, { useState } from 'react'

export const ModalEdit = ({ handleCloseModal, idEditar, descriptionEditar, handleToDos }) => {
    const [descripcionModal, setdescripcionModal] = useState(descriptionEditar)
    const onHandleClick = () => {
        handleCloseModal(x => {
            return !x;
        });
    };
    const onHandleChange = (event) => {
        setdescripcionModal(event.target.value);
    }
    const handleGuardar = async () => {
        const data = {
            id: idEditar,
            description: descripcionModal,
            done: false
        };
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Especificamos que estamos enviando datos en formato JSON
            },
            body: JSON.stringify(data), // Convertimos los datos a formato JSON y los enviamos en el cuerpo de la solicitud
        };

        const response = await fetch('https://localhost:44379/api/ToDoes/' + idEditar, requestOptions);
        if (!response.ok) {
            console.log(response)
            throw new Error('Error en la petición a la API');
        } else {
            handleCloseModal(x => {
                return !x;
            });
            handleToDos(x => {
                const editedToDos=x.map(z=>{
                    if(z.id==idEditar){
                        return {
                            ...z,
                            description: descripcionModal
                        }
                    }
                    return z;
                });
                return editedToDos;
            });
        }
    }
    return (
        <div className="animate__animated animate__headShake modal fade show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Editar Tarea</h1>
                        <button type="button" className="btn-close" onClick={onHandleClick} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <textarea
                            id="textarea"
                            name="texto"
                            rows="4" // Puedes ajustar el número de filas que se mostrarán inicialmente
                            cols="50" // Puedes ajustar el número de columnas que se mostrarán inicialmente
                            value={descripcionModal}
                            onChange={onHandleChange}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHandleClick}>
                            Cerrar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleGuardar}>
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
