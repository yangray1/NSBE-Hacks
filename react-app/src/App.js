import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const ReactDOM = require('react-dom');

const log = console.log;

class App extends React.Component {
  constructor(){
    super();
    this.state={
      input:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(event) {
    const that = this;
    event.preventDefault();
    let msg = event.target.input.value;

    fetch("http://localhost:3000/api/sendMessage", {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json' // Need this to make the body appear in the api call.
     },
      body: JSON.stringify({
        input: msg
      })
    }).then(response => {
      log("response: ",response)
      return response.json()
    }).then(contents => {
      console.log("contents: ",contents);
      this.setState({
        input: contents
      })
      return contents;
    }).catch((err) => {
      console.log(err)
    })
  }
  render() {
    return (
      <div>
        <h1>NSBEHacks 2019</h1>
        <p id="title">~Welcome to the Upturn~</p>

        <form onSubmit={this.handleSubmit}>
          <div class="formBox">
            <label for="exampleInputEmail1">input: </label>
            <input  class="form-control" id="input"  placeholder="Enter input" ></input>
          </div>
          <button type="submit" class="btn btn-primary" >Submit</button>
        </form>
        
        <p><strong>Output:</strong> {this.state.input}</p>

      </div>
      
    );
  }
}

export default App;
