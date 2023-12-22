import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import {message} from "./components/message/message";


function App() {
  return (
      <div className="App">
          <div>
              <Button
                  onClick={()=>{message.success("this a message success", 6000)}}
              >
                  success
              </Button>
              <Button
                  onClick={()=>{message.error("this a message error", 6000)}}
              >
                  error
              </Button>
              <Button
                  onClick={()=>{message.warning("this a message warning", 6000)}}
              >
                  warning
              </Button>
              <Button
                  onClick={()=>{message.info("this a message info", 6000)}}
              >
                  info
              </Button>
          </div>
      </div>
  );
}

export default App;
