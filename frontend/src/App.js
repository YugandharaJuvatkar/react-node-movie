import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Switch,Route,Link} from 'react-router-dom';

import MovieList from './components/movie-list';
import AddReview from './components/add-review';
import Movies from './components/movies';
import Login from './components/login';

function App() {
  const [user,setUser] = useState(null);
 
  async function login(user = null){
    setUser(user);
  }

  async function logout(){
    setUser(null);
  }

  return (   
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/movies" className="navbar-brand">
          Movie Reviews Company
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/movies"} className="nav-link">
              Movie
            </Link>
          </li>
          <li className="nav-item">
            {user ? (
              <a
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>
      
      <div className="container mt-3">
        <Switch>
          <Route
            exact
            path={["/", "/movies"]}
            component={MovieList}
          />
          <Route
            path="/movies/:id/review"
            render={(props) => <AddReview {...props} user={user} />}
          />
          <Route
            path="/movies/:id"
            render={(props) => <Movies {...props} user={user} />}
          />
          <Route
            path="/login"
            render={(props) => <Login {...props} login={login} />}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
