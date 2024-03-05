import './App.css';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import React from 'react';
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router} from 'react-router-dom';
import { fetchAllQuestions } from './actions/question';
import AllRoutes from './AllRoutes'
import { fetchAllUsers } from './actions/users';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  } ,[dispatch])

  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
