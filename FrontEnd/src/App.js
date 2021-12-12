//V1.2.0 TODO
//TODO: Login/register page --done--
//INFO: works with JWT
//TODO: user page --done--
//INFO: user page that works with JWT, shows everything to the user (links created, CRD ops)
//INFO: redirect any != 200 status to /login

import Login from './Login';
import User from './User';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
 
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/user" element={<User/>}/>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
