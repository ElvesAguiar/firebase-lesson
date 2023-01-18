import { useState } from "react";
import { db } from "./firebaseConnection";
import {doc, setDoc,collection,addDoc} from 'firebase/firestore'

import "./app.css";
import { async } from "@firebase/util";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");

  async function handleAdd() {
    // await setDoc(doc(db,"posts", "12345"),
    // {titulo: titulo,
    //   autor:autor}
    // )
    // .then((error)=>{
    //   console.log("Gerou Erro"+error)
    // })
    // .catch((error)=>{
    //   console.log("Gerou Erro"+error)
    // });
  
      await addDoc(collection(db,"posts"), {
        titulo:titulo,
        autor:autor,
      })
      .then(()=>{
        console.log("Cadatrado com Sucesso")
        setAutor('');
        setTitulo('');
      })
      .catch((error)=>{
        console.log("Error"+error);
      })
  
  
  }



  return (
    <div>
      <h1>Hello World!!! :)</h1>

      <div className="container">
        <label>Titulo:</label>
        <textarea
          type="text"
          placeholder="Digite o seu titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <label>Autor:</label>
        <input
          type="text"
          placeholder="Autor do post"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />

        <button onClick={handleAdd}>Cadatrar</button>
      </div>
    </div>
  );
}

export default App;
