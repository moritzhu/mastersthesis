import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home.js';
import Error from './Error.js';
import ErrorBoundary from './ErrorBoundary'
import XSS from './XSS'

function App() {
  return (
    <ErrorBoundary>
    <Router>
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav mr-auto">
        <li><Link to={'/home'} className="nav-link"> Home </Link></li>
        <li><Link to={'/error'} className="nav-link"> Error </Link></li>
        <li><Link to={'/xss'} className="nav-link"> XSS </Link></li>

      </ul>
      </nav>
      <hr />
      <Switch>
          <Route exact path='/home' component={Home} />
          <Route exact path='/error' component={Error} />
          <Route exact path='/xss' component={XSS} />

      </Switch>
    </div>
  </Router>
  </ErrorBoundary>
  );
}

export default App;
