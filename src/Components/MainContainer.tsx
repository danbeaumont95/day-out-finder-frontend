import {
  Routes,
  Route,
} from 'react-router-dom';
import Home from './Home';
import NavBar from './NavBar';
import PrivateRoute from './PrivateRoute';
import Profile from './Profile';

const MainContainer = () => {
  return (
    <div>

      <NavBar />
      <Routes>

          <Route path="/" element={(
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          )}
          />

          <Route path="/profile" element={(
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          )}
          />

      </Routes>

    </div>
  )
}

export default MainContainer;
