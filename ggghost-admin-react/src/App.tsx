import React, {useEffect} from 'react';
import './App.css';
import Button from '@mui/material/Button';
import {message} from "./components/message/message";
import {AppBar, ButtonGroup} from "@mui/material";


// @ts-ignore
import testImg from './test.png'
import {LStorage} from "./utils/storage";


function App() {
    const myStyle = {
        backgroundImage: "url('"+ testImg + "')",
        // height: '10vh',
        width: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        // opacity: 0.5
    }
    useEffect(()=>{
        console.log(process.env.NODE_ENV)
    }, [])
  return (
      <div className="App">
          <AppBar position="static" color="primary" enableColorOnDark style={myStyle}>
              'enableColorOnDark'
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Button onClick={()=> {
                      LStorage.set('hi','dd', 5000);
                  }}>set</Button>
                  <Button onClick={()=>{
                      const a = LStorage.get('hi');
                      console.log(a);
                  }}>get</Button>
                  <Button onClick={()=>{
                      LStorage.clear();
                  }}>clear</Button>
              </ButtonGroup>
          </AppBar>
          <div style={myStyle}></div>
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
