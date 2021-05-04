import './App.css';
import { AuthProvider } from './utilities/AuthContext';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from './components/Register';
import UserLanding from './views/UserLanding';

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

        </AuthProvider>
      </Switch>
    </Router>


  );
}

export default App;
