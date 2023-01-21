import { useState } from "react";
import { db } from "./firebaseConnection";
import {doc, setDoc,collection,addDoc, getDoc, getDocs, updateDoc} from 'firebase/firestore'

import "./app.css";
import { async } from "@firebase/util";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");

  const [posts, setPosts] = useState([]);
  const [idPost, setIdPost] = useState([]);

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

  async function bucarPost(){
    // const postRef = doc(db, "posts","pfOLMBaCuPoikoYRb4wl" );
    // await getDoc(postRef).
    // then((snapshot)=>{
    //   setAutor(snapshot.data().autor);
    //   setTitulo(snapshot.data().titulo);
    // }).
    // catch((error)=>{
    //   console.log("Error: "+error);
    // });


    const postRef = collection(db, "posts");
    await getDocs(postRef).
    then((snapshot) => {
      let list = [];
      snapshot.forEach((doc)=> {
        list.push({
          id: doc.id,
          titulo: doc.data().titulo ,
          autor: doc.data().autor
        })
      })

      setPosts(list);

    }).
    catch((error)=>{
      console.log("Deu Algum erro"+ error)
    });



  }

  async function editarPost(){
    
    const docRef = doc(db, "posts", idPost);

    await updateDoc (docRef, {
      titulo : titulo,
      autor: autor
    })
    .then(()=>{
      console.log("Post Atulizado!");
      setIdPost('');
      setTitulo('');
      setAutor('')
    })
    .catch((error) => {console.log("Error ao atualizar:" + error)})


  }


  return (
    <div>
      <h1>Hello World!!! :)</h1>

      <div className="container">
        <label>ID do Post:</label>
        <input placeholder = "Digite o ID do post" 
        value = {idPost} 
        onChange={(e)=>{setIdPost(e.target.value)}} /><br/>
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
        <button onClick={bucarPost}>Buscar Post</button><br/>
        <button onClick={editarPost}>Atualizar Post</button>

          <ul>
            {posts.map((post)=>{
              return(
                <li key={post.id}>
                  <strong>ID: {post.id}</strong><br/>
                  <span>titulo:{post.titulo} </span><br/>
                  <span>autor:{post.autor} </span><br/><br/>
                </li>
              )
            })}
          </ul>

      </div>
    </div>
  );
}

export default App;
