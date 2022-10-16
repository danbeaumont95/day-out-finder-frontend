import './App.css';
import Login from "./Components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import PrivateRoute from "./Components/PrivateRoute";
import MainContainer from "./Components/MainContainer";

function App() {

  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={(
                <PrivateRoute>
                  <MainContainer />
                </PrivateRoute>
            )}
            />
          </Routes>
      </Router>
    </div>
  )
  
}
export default App;
