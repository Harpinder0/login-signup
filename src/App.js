import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { initializeFirebase } from './utils/firebase';

// styling
import './App.css';

// components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';


initializeFirebase();

function App() {

const [user, setUser] = useState(null)

useEffect(() => {
const auth = getAuth();
onAuthStateChanged(auth, user => {setUser(user)})

},[])

  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
