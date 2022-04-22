import React from "react";
import "./styles.css";

//- Día 3: Estámos generosos, vamos a agregar un formulario con un input para escribir nuestro regalo 
//y un botón para agregarlo a nuestra lista, todavía no los podemos borrar, pero... es navidad! Por que querríamos borrar regalos?

export default function App() {
  const [giftList, setGiftList] = React.useState([])
  const [gift, setGift] = React.useState('')

  function addGift(event){
    event.preventDefault()
    setGiftList(prevGiftList => {
      return [...prevGiftList, gift]
    })
    setGift('')
  }

  return (
    <div className="App">
      <h1>Gifts:</h1>
      <form onSubmit={addGift}>
        <input type="text" onChange={(e) => setGift(e.target.value)} value={gift} />
        <button>Add</button>
      </form>
      <ul>
        {giftList.map((gift, giftIndex) => (
          <li key={giftIndex}>{gift}</li>
        ))}
      </ul>
    </div>
  );
}
