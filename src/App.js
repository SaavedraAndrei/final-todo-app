import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Form from "./Form";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";
import { capitalize } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();

    db.collection("todos").add({
      todo: capitalize(input),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTodos([...todos, input]);
    setInput("");
  };

  useEffect(() => {
    const num = Math.round(Math.random() * 100);
    async function fetchQuote() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();

      setQuote(data[num].text);
      setAuthor(data[num].author);
    }

    fetchQuote();
  }, []);

  return (
    <div className="app">
      <div className="quote">
        <h1 className="quote__text">"{quote}"</h1>
        <h1 className="quote__author">-{author}</h1>
      </div>

      <h1 className="app__title">Final Todo App🚀🔥</h1>

      <Form addTodo={addTodo} input={input} setInput={setInput} />

      {todos.map((todo) => (
        <Todo todo={todo} />
      ))}

      <img src={logo} className="app__logo" alt="logo" />
    </div>
  );
}

export default App;
