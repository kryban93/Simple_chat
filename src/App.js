import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import LandingView from './Views/LandingView/LandingView';
import LoginView from './Views/LoginView/LoginView';
import SignUpView from './Views/SignUpView/SignUpView';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import MainView from './Views/MainView/MainView';
import ForgotPasswordView from './Views/ForgotPasswordView/ForgotPasswordView';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={LandingView} />
            <Route path='/login' component={LoginView} />
            <Route path='/signUp' component={SignUpView} />
            <Route path='/forgot' component={ForgotPasswordView} />
            <PrivateRoute path='/main' component={MainView} />
          </Switch>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
