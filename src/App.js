import React from "react";
import "./styles.css";

//- Día 4: Papa noel no estuvo muy contento con la demanda de regalos, vamos a tener que agregar un botón de eliminar a cada elemento para poder borrarlos individualmente.

export default function App() {
  const [list, setList] = React.useState([])
  const [giftInput, setGiftInput] = React.useState("")

  function handleSubmit(event) {
    event.preventDefault()
    setList(prevList => {
      return [...prevList, giftInput]
    } )
  }

  function handleButtonDelete(event, index){
    console.log(event)
    console.log(index)
    setList(prevList => {
      return prevList.splice(index,1)
    })
  }

  return (
    <div className="App">
      <h1>Regalos:</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Ingrese su regalo" onChange={(e) => setGiftInput(e.target.value)} value={giftInput}/>
        <button>Add</button>
      </form>
      
      <ul>
      {list.map((item,itemIndex) => {
        return (
          <div key={itemIndex}>
            <li key={itemIndex}>{item}</li>
            <button onClick={(e) => handleButtonDelete(e, itemIndex)}>X</button>
          </div>
          )
      })}
      </ul>
    </div>
  );
}
