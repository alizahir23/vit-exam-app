import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserContext from './Utilities/UserContext'
import PrivateRoute from './Utilities/PrivateRoute'
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home'
import Test from './Pages/Test/Test'
import ViewTest from './Pages/Test/ViewTest'
import PrivateHeader from './Components/Headers/PrivateHeader'


function App() {


  const [User, setUser] = useState(null);

  useEffect(() => {
    console.log(localStorage.getItem("user"))
    setUser(localStorage.getItem("user"))
  }, [])

  return (
    <Router>
      <div>
        <UserContext.Provider value={{ User, setUser }}>
          <PrivateHeader />
          <Switch>
            <Route path="/" component={Login} exact />
            <PrivateRoute path="/Home" component={Home} exact />
            <PrivateRoute path="/Test" component={Test} exact />
            <PrivateRoute path="/ViewTest" component={ViewTest} exact />
          </Switch>
          {/* <Footer /> */}
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
