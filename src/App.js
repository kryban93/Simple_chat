import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingView from './Views/LandingView/LandingView';
import LoginView from './Views/LoginView/LoginView';
import SignUpView from './Views/SignUpView/SignUpView';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import MainView from './Views/MainView/MainView';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={LandingView} />
          <Route path='/login' component={LoginView} />
          <Route path='/signUp' component={SignUpView} />
          <PrivateRoute path='/main' component={MainView} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
