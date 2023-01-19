// import Hover from './components/Hover';
// import List from './components/List';

import { useState } from "react";
import useDebounce from "./hooks/useDebounce";
import axios from "axios";
import useRequest from "./hooks/useRequest";



function App() {

   const [value, setValue] = useState('')
   const debouncedSearch = useDebounce(search, 500)

   const onChange = (e) => {
     setValue(e.target.value)
     debouncedSearch(e.target.value)
   }

  function search(query) {
    fetch(`https://jsonplaceholder.typicode.com/todos?query=`+query)
    .then(response => response.json())
    .then(json => {
      console.log(json)
    })
}


const [todos, loading, error] = useRequest(fetchTodos)
function fetchTodos() {
  return axios.get(`https://jsonplaceholder.typicode.com/todos`)
}

if(loading){
  return <h1>Loading...</h1>
}

if(error){
  return <h1>Error</h1>
}

  return (
    <div>
      {/* <Hover/>
      <List/> */}
      <input value={value} onChange={onChange} type='text'/>
      {todos && todos.map(todo => 
                <div key={todo.id} style={{padding: 30, border: '2px solid black'}}>
                    {todo.id} {todo.title}
                </div>
            )}
    </div>
  );
}

export default App;
