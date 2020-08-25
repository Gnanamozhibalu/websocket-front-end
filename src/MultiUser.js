import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import "./MultiUser.css";

const socket = io.connect("http://localhost:4000");

function MultiUser() {
  const [state, setStaet] = useState({
    message: "Pressed the Button",
    name: "",
  });
  const [chat, setChat] = useState([]);
  //chat A
  const [stateA, setStaetA] = useState({
    message: "Pressed the Button",
    name: "",
  });
  const [chatA, setChatA] = useState([]);

  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });

  const onTextChange = (e) => {
    setStaet({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit("message", { name, message });
    /* setStaet({ message: 'Pressed the Button', name }) */
  };

  const renderbuttonclick = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name} <span>{message}</span>
        </h3>
      </div>
    ));
  };

  //chat A
  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChatA([...chatA, { name, message }]);
    });
  });

  const onTextChangeA = (e) => {
    setStaetA({ ...stateA, [e.target.name]: e.target.value });
  };

  const onMessageSubmitA = (e) => {
    e.preventDefault();
    const { name, message } = stateA;
    socket.emit("message", { name, message });
    /* setStaet({ message: 'Pressed the Button', name }) */
  };

  const renderbuttonclickA = () => {
    return chatA.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name} <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>USER A</h1>
        <div className="name-field">
          <TextField
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <button>Click the Button</button>
        {renderbuttonclick()}
      </form>

      <form onSubmit={onMessageSubmitA}>
        <h1>USER B</h1>
        <div className="name-field">
          <TextField
            name="name"
            onChange={(e) => onTextChangeA(e)}
            value={stateA.name}
            label="Name"
          />
        </div>
        <button>Click the Button</button>
        {renderbuttonclickA()}
      </form>
    </div>
  );
}

export default MultiUser;
