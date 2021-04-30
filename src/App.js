import './App.css';
import UserLanding from './UserLanding';
import { AuthProvider } from './utilities/AuthContext';

function App() {



  return (
    <AuthProvider>
      <UserLanding />
    </AuthProvider>


  );
}

export default App;
