import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./MultiUser.css";

const socket = io.connect("https://websocket-back-end.herokuapp.com/");

function MultiUser() {
  const [state, setStaet] = useState({
    message: "pressed the button",
    name: "",
  });
  const [chat, setChat] = useState([]);
  const [button1Enable, setButton1Enable] = useState(false);
  const [button2Enable, setButton2Enable] = useState(false);

  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });

  const onTextChange = (e) => {
    setStaet({ ...state, [e.target.name]: e.target.value });
  };

  /* const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit("message", { name, message });
    setStaet({ message: '', name })
  }; */
  const renderbuttonclick = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name} <span>{message}</span>
        </h3>
      </div>
    ));
  };

  const onEnable = (e) => {
    e.preventDefault();
    setStaet({
      message: "Enabled the Button 1",
      name:state.name,
    })
    const { name, message } = state;
    setButton1Enable(true);
    setButton2Enable(false);
    socket.emit("message", { name, message });
  };

  const onDisable = (e) => {
    e.preventDefault();
    setStaet({
      message: "Enabled the Button 2",
      name:state.name,
    })
    const { name, message } = state;
    setButton2Enable(true);
    setButton1Enable(false);
    socket.emit("message", { name, message });
  };

  return (
    <div className="card">
      <form>
        <h1>WELCOME USER</h1>
        <div className="name-field">
          <TextField
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
        <Button
          variant="contained"
          color="primary"
          disabled={button1Enable}
          onClick={onEnable}
        >
          Button 1
        </Button>
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={button2Enable}
          onClick={onDisable}
        >
          button 2
        </Button>
        {renderbuttonclick()}
      </form>
    </div>
  );
}

export default MultiUser;
