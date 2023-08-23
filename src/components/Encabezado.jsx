import React from 'react'

export const Encabezado = ({toDos}) => {
    const handleReporte = async () => {
        try {
            const response = await fetch('https://localhost:44379/api/ToDoes/ObtenerReporte');
            if (!response.ok) {
                throw new Error('Error en la petición a la API');
            }
            const data = await response.text(); // Obtener el contenido Base64 como una cadena

            // Convertir el contenido Base64 en un objeto Blob
            const pdfBlob = base64ToBlob(data, 'application/pdf');

            // Crear una URL temporal para el enlace de descarga
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Crear un enlace de descarga y simular un clic para iniciar la descarga
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'reporte.pdf';
            link.click();

            // Liberar la URL temporal
            URL.revokeObjectURL(pdfUrl);

        } catch (error) {
            console.warn('Error:', error);
        }
    };

    // Función para convertir Base64 en Blob
    const base64ToBlob = (base64Data, contentType) => {
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    };

    return (
        <div className="row">
            <div className="col-11" style={{ textAlign: 'center' }}>
                <h2 style={{ display: 'inline' }}>Lista de tareas | </h2>
                <h5 style={{ display: 'inline' }}>{toDos.filter(x=>x.done===true).length} de {toDos.length} tareas completadas</h5>
            </div>
            <div className="col-1">
                <button type="button" className="btn btn-danger" onClick={handleReporte}>
                    Reporte
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-filetype-pdf"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}
