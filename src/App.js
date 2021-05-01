import './App.css';
import { AuthProvider } from './utilities/AuthContext';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from './Register';
// import Login from './Login';
import UserLanding from './UserLanding';

function App() {



  return (
    <Router>
      <Switch>
        <AuthProvider>

          <Route exact path="/">
            <UserLanding />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          {/* <Route path="/login">
            <Login />
          </Route> */}

        </AuthProvider>
      </Switch>
    </Router>


  );
}

export default App;
