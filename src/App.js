import './App.css';
import { AuthProvider } from './utilities/AuthContext';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from './Register';
import LoginForm from './LoginForm';

function App() {



  return (
    <Router>
      <Switch>
        <AuthProvider>
        
          <Route path="/register">
            <Register />
          </Route>

        </AuthProvider>
      </Switch>
    </Router>


  );
}

export default App;
