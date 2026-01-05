/*import Login from "../pages/Login";
import Register from "../pages/Register";
function App() {
  return (  
    <Login/>
  );
}

export default App;*/

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

const isLoggedIn = !!localStorage.getItem("token");

function App() {
  return isLoggedIn ? <Dashboard /> : <Login />;
}

export default App;

