import './App.css';
import UserLanding from './UserLanding';
import axios from 'axios';
import { AuthProvider } from './utilities/AuthContext';

function App() {



  return (
    <AuthProvider>
      <UserLanding />
    </AuthProvider>


  );
}

export default App;
