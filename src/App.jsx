import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Form } from './components/Form'
import { TodoItem } from './components/TodoItem'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container position-absolute top-50 start-50 translate-middle'>
     <Form/>
     <TodoItem/>
     <TodoItem/>
     <TodoItem/>


    </div>
  )
}

export default App
