import { useEffect, useState } from 'react'
import './App.css'
import { Form } from './components/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import { TodoList } from './components/TodoList'

function App() {
  const [toDos, setToDos] = useState([]);
  const [loading, setloading] = useState(true);
  const [nextIdToDo, setnextIdToDo] = useState(1);

  useEffect(() => {
    const getTodoList = async () => {
      try {
        const response = await fetch('https://localhost:44379/api/ToDoes');
        if (!response.ok) {
          throw new Error('Error en la petición a la API');
        }
        const data = await response.json(); // Aquí obtenemos los datos reales de la API

        setToDos(data);
        setloading(false);

      } catch (error) {
        console.warn('Error:', error);
      }
    };
    getTodoList();
  }, [])


  useEffect(() => {
    if(toDos.length>0){
      let ultimoIdToDo=toDos[toDos.length-1].id;
      setnextIdToDo(ultimoIdToDo+1);
    }
  }, [toDos])
  


  return (
    <div className='container position-absolute top-50 start-50 translate-middle pt-5' style={{height: '100%'}} >
      <Form handleSubmit={setToDos} nextId={nextIdToDo}/>

      {
        !loading && <TodoList toDos={toDos} handleToDos={setToDos}/>
      }

    </div>
  )
}

export default App
