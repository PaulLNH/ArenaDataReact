import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <Route>
            <div className="App">
                <NavBar />
                <Home />
            </div>
        </Route>
            );
        }
    }
    // Somehow need to access this from NavBar.js    
    // {value === 0 && <TabContainer>2v2</TabContainer>}
    // {value === 1 && <TabContainer>3v3</TabContainer>}
    // {value === 2 && <TabContainer>RBG</TabContainer>}
export default App;
