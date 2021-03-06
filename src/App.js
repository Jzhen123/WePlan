import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from './utilities/AuthContext';
import { GroupProvider } from './utilities/GroupContext';
import { CalendarProvider } from './utilities/CalendarContext';
import UserLanding from './views/UserLanding';
import Dashboard from './views/Dashboard';

function App() {

  return (
    <Router>
      <Switch> {/* Allows for all <Routes> to be referenced across all children */}
        <AuthProvider> {/* Allows access to all helper functions/variables related to OAuth and User Data */}
          <CalendarProvider>
            <GroupProvider> {/* Allows access to all helper functions/variables related to Groups */}

              <Route exact path="/"> {/* Dashboard/Main View */}
                <Dashboard />
              </Route>


              <Route path="/login"> {/* Where Users will be redirected if they are not logged in or their token expires */}
                <UserLanding />
              </Route>


            </GroupProvider>
          </CalendarProvider>
        </AuthProvider>
      </Switch>
    </Router>

  );
}

export default App;
