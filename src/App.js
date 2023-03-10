import React, { useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import IndexPage from './pages';
import CategoryPage from './pages/category';
import InboxPage from './pages/inbox';
import LoginPage from './pages/login';
import LogoutPage from './pages/logout';
import NewProductPage from './pages/newProduct';
import ProductPage from './pages/product';
import RegisterPage from './pages/register';

function App() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // store the user on local storage
        localStorage.setItem('userUID', user.uid);
      } else {
        // removes the user from local storage on logOut
        localStorage.removeItem('userUID');
      }
    });
  }, []);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <IndexPage />
          </Route>
          <Route path='/category/:name'>
            <CategoryPage />
          </Route>
          <PrivateRoute path='/inbox'>
            <InboxPage />
          </PrivateRoute>
          <PrivateRoute path='/product/new'>
            <NewProductPage />
          </PrivateRoute>
          <Route path='/product/:id'>
            <ProductPage />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/logout'>
            <LogoutPage />
          </Route>
          <Route path='/register'>
            <RegisterPage />
          </Route>
          <Route path='*'>
            <IndexPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('userUID') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
