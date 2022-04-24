import React from "react";
import "./styles.css";
import { nanoid } from "nanoid";

//- Día 4: Papa noel no estuvo muy contento con la demanda de regalos, vamos a tener que agregar un botón de eliminar a cada elemento para poder borrarlos individualmente.

export default function App() {
  const [list, setList] = React.useState([])
  const [giftInput, setGiftInput] = React.useState("")

  function handleSubmit(event) {
    event.preventDefault()
    setList(prevList => {
      return [...prevList, 
        {name: giftInput,
        id: nanoid()
        }]
    })
    setGiftInput("")
  }

  function handleButtonDelete(event, id){
    event.preventDefault()
    setList(prevList => prevList.filter(item => item.id !== id))
    
  }

  return (
    <div className="App">
      <h1>Regalos:</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Ingrese su regalo" onChange={(e) => setGiftInput(e.target.value)} value={giftInput}/>
        <button>Add</button>
      </form>
      
      <ul>
      {list.map((item) => {
        return (
          <div key={item.id}>
            <li key={item.id}>{item.name}</li>
            <button onClick={(e) => handleButtonDelete(e, item.id)}>X</button>
          </div>
          )
      })}
      </ul>
    </div>
  );
}
